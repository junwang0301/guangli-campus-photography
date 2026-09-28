"use client";

/* eslint-disable @next/next/no-img-element */

import { Download, FileImage, LoaderCircle, RefreshCcw, ShieldCheck, Sparkles, Upload } from "lucide-react";
import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";
import { PHOTO_ENHANCEMENT_PROMPT } from "@/lib/image-prompt";
import { DASHSCOPE_API_KEY, QWEN_API_BASE, QWEN_IMAGE_MODEL } from "@/lib/server-config";

type Phase = "idle" | "ready" | "processing" | "success" | "error";
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_INPUT_BYTES = 20 * 1024 * 1024;
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

async function prepareImage(file: File) {
  if (!ALLOWED_TYPES.includes(file.type)) throw new Error("仅支持 JPEG、PNG 和 WebP 图片。");
  if (file.size > MAX_INPUT_BYTES) throw new Error("原图不能超过 20MB，请先压缩后重试。");

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 2048 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const context = canvas.getContext("2d");
  if (!context) throw new Error("浏览器无法处理这张图片，请更换浏览器后重试。");
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", 0.9));
  if (!blob) throw new Error("图片压缩失败，请重新选择。");
  if (blob.size > MAX_UPLOAD_BYTES) throw new Error("图片压缩后仍超过 4MB，请选择尺寸更小的原图。");

  const baseName = file.name.replace(/\.[^.]+$/, "");
  return new File([blob], `${baseName}.webp`, { type: "image/webp" });
}


async function enhanceLocally(file: File) {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) throw new Error("浏览器无法处理这张图片。");
  context.drawImage(bitmap, 0, 0);
  bitmap.close();
  const image = context.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = image.data;
  for (let index = 0; index < pixels.length; index += 4) {
    const r = pixels[index];
    const g = pixels[index + 1];
    const b = pixels[index + 2];
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const contrast = 1.08;
    const saturation = 1.06;
    const brighten = 7;
    pixels[index] = Math.max(0, Math.min(255, (luminance + (r - luminance) * saturation - 128) * contrast + 128 + brighten));
    pixels[index + 1] = Math.max(0, Math.min(255, (luminance + (g - luminance) * saturation - 128) * contrast + 128 + brighten));
    pixels[index + 2] = Math.max(0, Math.min(255, (luminance + (b - luminance) * saturation - 128) * contrast + 128 + brighten));
  }
  context.putImageData(image, 0, 0);
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", 0.92));
  if (!blob) throw new Error("本地图片增强失败，请重新选择。");
  return blob;
}

async function fileToDataUrl(file: File) {
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("图片读取失败，请重新选择。"));
    reader.readAsDataURL(file);
  });
}

async function requestEnhancement(file: File) {
  if (!DASHSCOPE_API_KEY || DASHSCOPE_API_KEY === "PASTE_YOUR_DASHSCOPE_API_KEY_HERE") {
    return { blob: await enhanceLocally(file), mode: "local" as const };
  }

  const image = await fileToDataUrl(file);
  const response = await fetch(`${QWEN_API_BASE}/services/aigc/multimodal-generation/generation`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${DASHSCOPE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: QWEN_IMAGE_MODEL,
      input: {
        messages: [{
          role: "user",
          content: [
            { image },
            { text: PHOTO_ENHANCEMENT_PROMPT },
          ],
        }],
      },
      parameters: {
        n: 1,
        negative_prompt: "过度锐化，过度饱和，塑料皮肤，HDR光晕，改变人物，改变构图，新增物体，删除物体，文字，水印",
        prompt_extend: true,
        watermark: false,
      },
    }),
  });

  const payload = await response.json() as {
    code?: string;
    message?: string;
    output?: { choices?: Array<{ message?: { content?: Array<{ image?: string }> } }> };
  };
  if (!response.ok) throw new Error(payload.message || "阿里云千问图像编辑失败，请稍后重试。");
  const imageUrl = payload.output?.choices?.[0]?.message?.content?.find((item) => item.image)?.image;
  if (!imageUrl) throw new Error("千问模型没有返回图片，请稍后重试。");

  const imageResponse = await fetch(imageUrl);
  if (!imageResponse.ok) throw new Error("优化图片下载失败，请稍后重试。");
  return { blob: await imageResponse.blob(), mode: "qwen" as const };
}
export function EnhanceStudio() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [sourceUrl, setSourceUrl] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [preparedSize, setPreparedSize] = useState("");
  const [error, setError] = useState("");
  const [enhancementMode, setEnhancementMode] = useState<"qwen" | "local" | "">("");
  const [split, setSplit] = useState(50);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const preparedFile = useRef<File | null>(null);

  useEffect(() => { inputRef.current?.setAttribute("data-ready", "true"); }, []);

  const resetUrls = () => {
    if (sourceUrl) URL.revokeObjectURL(sourceUrl);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
  };

  const acceptFile = async (file: File) => {
    resetUrls();
    setError("");
    setResultUrl("");
    setPhase("idle");
    try {
      const prepared = await prepareImage(file);
      preparedFile.current = prepared;
      setSourceUrl(URL.createObjectURL(prepared));
      setFileName(file.name);
      setPreparedSize(`${(prepared.size / 1024 / 1024).toFixed(2)} MB`);
      setPhase("ready");
    } catch (cause) {
      preparedFile.current = null;
      setError(cause instanceof Error ? cause.message : "图片读取失败，请重试。");
      setPhase("error");
    }
  };

  const onInput = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) void acceptFile(file);
  };

  const onDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) void acceptFile(file);
  };

  const enhance = async () => {
    if (!preparedFile.current) return;
    setPhase("processing");
    setError("");
    try {
      const result = await requestEnhancement(preparedFile.current);
      const blob = result.blob;
      setEnhancementMode(result.mode);
      if (!blob.type.startsWith("image/")) throw new Error("服务返回了无效的图片数据。");
      if (resultUrl) URL.revokeObjectURL(resultUrl);
      setResultUrl(URL.createObjectURL(blob));
      setSplit(50);
      setPhase("success");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "图片优化失败，请稍后重试。");
      setPhase("error");
    }
  };

  const reset = () => {
    resetUrls();
    preparedFile.current = null;
    setSourceUrl("");
    setResultUrl("");
    setFileName("");
    setPreparedSize("");
    setError("");
    setEnhancementMode("");
    setSplit(50);
    setPhase("idle");
  };

  const statusText = { idle: "等待上传", ready: "原片已就绪", processing: "正在优化", success: "优化完成", error: "处理失败" }[phase];

  return (
    <div className="studio-shell">
      <section className="workspace" aria-label="AI 图片优化工作区">
        <div className="workspace__toolbar">
          <span>工作区 / 自动摄影增强</span>
          <span className="workspace__status"><i className={`status-dot is-${phase}`} />{statusText}</span>
        </div>
        {!sourceUrl ? (
          <label className={`dropzone ${dragging ? "is-dragging" : ""}`} htmlFor="photo-upload"
            onDragEnter={(event) => { event.preventDefault(); setDragging(true); }}
            onDragOver={(event) => event.preventDefault()}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}>
            <input ref={inputRef} className="sr-only" id="photo-upload" type="file" data-ready="false" accept={ALLOWED_TYPES.join(",")} onChange={onInput} />
            <div className="dropzone__inner">
              <span className="dropzone__icon"><Upload size={28} aria-hidden="true" /></span>
              <h2>拖入一张校园照片</h2>
              <p>或点击选择 JPEG、PNG、WebP 文件。浏览器会在本机完成缩放与压缩。</p>
              <span className="button button--ghost">选择原片</span>
            </div>
          </label>
        ) : resultUrl ? (
          <div className="comparison" data-testid="comparison">
            <img src={resultUrl} alt="AI 优化后的照片" />
            <div className="comparison__after" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}><img src={sourceUrl} alt="AI 优化前的原片" /></div>
            <span className="comparison__divider" style={{ left: `${split}%` }} />
            <span className="comparison__label comparison__label--before">优化前</span>
            <span className="comparison__label comparison__label--after">优化后</span>
            <input className="comparison__range" type="range" min="0" max="100" value={split} aria-label="拖动查看优化前后对比" onChange={(event) => setSplit(Number(event.target.value))} />
          </div>
        ) : (
          <div className="comparison"><img src={sourceUrl} alt="待优化的原始照片" /><span className="comparison__label comparison__label--before">原片预览</span></div>
        )}
      </section>
      <aside className="studio-side">
        <section className="side-card">
          <h2>本次处理</h2>
          <p>{fileName ? "已准备好摄影增强请求。" : "上传原片后，将自动修正曝光、暗部、高光、色偏、噪点与细节。"}</p>
          {fileName && <div className="file-meta"><FileImage size={16} aria-hidden="true" /><span>{fileName} · 上传体积 {preparedSize}</span></div>}
          {error && <div className="alert" role="alert">{error}</div>}
          {phase === "success" && <div className="alert alert--success" role="status">{enhancementMode === "local" ? "已完成本地增强。当前未配置有效的阿里云百炼 Key，已自动使用浏览器基础美化。" : "千问 AI 已完成优化，可拖动中间滑块查看细节变化。"}</div>}
          <div className="action-stack">
            {!resultUrl && <button className="button button--accent" type="button" onClick={enhance} disabled={!sourceUrl || phase === "processing"}>{phase === "processing" ? <><LoaderCircle className="spin" size={17} aria-hidden="true" />正在优化</> : <><Sparkles size={17} aria-hidden="true" />一键优化照片</>}</button>}
            {resultUrl && <a className="button button--accent" href={resultUrl} download="guangli-enhanced.webp"><Download size={17} aria-hidden="true" />下载优化成片</a>}
            {sourceUrl && <button className="button button--ghost" type="button" onClick={reset} disabled={phase === "processing"}><RefreshCcw size={17} aria-hidden="true" />重新选择</button>}
          </div>
        </section>
        <section className="side-card">
          <h3>我们坚持的边界</h3>
          <ul><li>保留人物身份、构图和真实场景，不替你做创意改写。</li><li>图片仅用于本次处理，不在服务器持久保存。</li><li>当前静态版本会在浏览器中直接请求阿里云百炼。</li></ul>
          <div className="file-meta"><ShieldCheck size={16} aria-hidden="true" /><span>处理后请勿用于侵犯他人肖像或版权</span></div>
        </section>
      </aside>
    </div>
  );
}