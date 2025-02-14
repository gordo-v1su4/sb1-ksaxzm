import { fal } from "@fal-ai/client";

// Initialize fal client with API key
fal.config({
  credentials: import.meta.env.VITE_FAL_API_KEY,
});

// Common types
export interface ImageSize {
  width: number;
  height: number;
}

export interface GenerationResult {
  url: string;
  seed?: number;
}

// Base configuration interface
export interface BaseModelConfig {
  prompt: string;
  image_size?: ImageSize | string;
  num_images: number;
  negative_prompt?: string;
  seed?: number;
}

// Model specific configurations
export interface RealisticVisionConfig extends BaseModelConfig {
  loras: Array<{
    path: string;
    scale: number;
  }>;
  guidance_scale: number;
  num_inference_steps: number;
  enable_safety_checker: boolean;
  safety_checker_version: "v1" | "v2" | undefined;
}

export interface FluxProConfig extends BaseModelConfig {
  enable_safety_checker: boolean;
  safety_tolerance: string;
  output_format: string;
  aspect_ratio: string;
  sync_mode: boolean;
  raw: boolean;
  image_size?: string;
  num_inference_steps?: number;
  guidance_scale?: number;
  negative_prompt?: string;
}

export interface FluxLoraConfig extends BaseModelConfig {
  image_size: string;
  num_inference_steps: number;
  guidance_scale: number;
  enable_safety_checker: boolean;
  output_format: string;
  loras: Array<{
    path: string;
    scale?: number;
  }>;
}

export type ModelType = 'amateur-photography' | 'realistic-vision' | 'flux-pro' | 'flux-lora' | 'anime-lora';

export interface ModelInfo {
  id: ModelType;
  name: string;
  description: string;
  previewImage: string;
  defaultConfig: Partial<RealisticVisionConfig | FluxProConfig | FluxLoraConfig>;
}

// Model configurations
export const MODELS: ModelInfo[] = [
  {
    id: 'amateur-photography',
    name: 'Amateur Photography [Flux Dev]',
    description: 'Casual and authentic photography style with natural lighting and composition',
    previewImage: '/assets/model-previews/flux-amateur-photography.png',
    defaultConfig: {
      num_images: 2,
      enable_safety_checker: false,
      safety_tolerance: "5",
      output_format: "png",
      aspect_ratio: "9:16",
      sync_mode: false,
      raw: true,
      image_size: "portrait_16_9",
      num_inference_steps: 35,
      guidance_scale: 6.5,
      negative_prompt: "(worst quality, low quality, normal quality, lowres, low details, oversaturated, undersaturated, overexposed, underexposed, grayscale, bw, bad photo, bad photography, bad art:1.4), (watermark, signature, text font, username, error, logo, words, letters, digits, autograph, trademark, name:1.2), (blur, blurry, grainy), morbid, ugly, asymmetrical, mutated malformed, mutilated, poorly lit, bad shadow, draft, cropped, out of frame, cut off, censored, jpeg artifacts, out of focus, glitch, duplicate, (airbrushed, cartoon, anime, semi-realistic, cgi, render, blender, digital art, manga:1.3)"
    }
  },
  {
    id: 'realistic-vision',
    name: 'Realistic Vision',
    description: 'Perfect for capturing emotional moments and expressions with stunning photorealistic detail',
    previewImage: '/assets/model-previews/realistic-vision.jpg',
    defaultConfig: {
      loras: [{
        path: "https://civitai.com/api/download/models/209105?type=Model&format=SafeTensor",
        scale: 0.6
      }],
      image_size: {
        width: 720,
        height: 1280
      },
      num_images: 4,
      guidance_scale: 5,
      num_inference_steps: 35,
      enable_safety_checker: true,
      safety_checker_version: "v1",
      negative_prompt: "(worst quality, low quality, normal quality, lowres, low details, oversaturated, undersaturated, overexposed, underexposed, grayscale, bw, bad photo, bad photography, bad art:1.4), (watermark, signature, text font, username, error, logo, words, letters, digits, autograph, trademark, name:1.2), (blur, blurry, grainy), morbid, ugly, asymmetrical, mutated malformed, mutilated, poorly lit, bad shadow, draft, cropped, out of frame, cut off, censored, jpeg artifacts, out of focus, glitch, duplicate, (airbrushed, cartoon, anime, semi-realistic, cgi, render, blender, digital art, manga, amateur:1.3), (3D ,3D Game, 3D Game Scene, 3D Character:1.1), (bad hands, bad anatomy, bad body, bad face, bad teeth, bad arms, bad legs, deformities:1.3)"
    }
  },
  {
    id: 'flux-pro',
    name: 'Flux Pro Ultra',
    description: 'Exceptional for unique compositions and creative photorealistic scenarios',
    previewImage: '/assets/model-previews/flux-pro-ultra.png',
    defaultConfig: {
      num_images: 2,
      enable_safety_checker: false,
      safety_tolerance: "5",
      output_format: "png",
      aspect_ratio: "9:16",
      sync_mode: false,
      raw: true,
      image_size: "portrait_16_9",
      num_inference_steps: 40,
      guidance_scale: 7.5,
      negative_prompt: "(worst quality, low quality, normal quality, lowres, low details, oversaturated, undersaturated, overexposed, underexposed, grayscale, bw, bad photo, bad photography, bad art:1.4), (watermark, signature, text font, username, error, logo, words, letters, digits, autograph, trademark, name:1.2), (blur, blurry, grainy), morbid, ugly, asymmetrical, mutated malformed, mutilated, poorly lit, bad shadow, draft, cropped, out of frame, cut off, censored, jpeg artifacts, out of focus, glitch, duplicate, (airbrushed, cartoon, anime, semi-realistic, cgi, render, blender, digital art, manga, amateur:1.3)"
    }
  },
  {
    id: 'flux-lora',
    name: 'Custom LoRA - Animal People',
    description: 'Generate anthropomorphic animal characters with unique personality',
    previewImage: '/assets/model-previews/flux-lora.jpg',
    defaultConfig: {
      image_size: "portrait_16_9",
      num_inference_steps: 35,
      guidance_scale: 3.5,
      num_images: 2,
      enable_safety_checker: true,
      output_format: "jpeg",
      loras: [{
        path: "https://civitai.com/api/download/models/1085477?type=Model&format=SafeTensor"
      }]
    }
  },
  {
    id: 'anime-lora',
    name: 'Anime Style',
    description: 'Japanese animation style with Juaner cartoon aesthetics',
    previewImage: '/assets/model-previews/anime-style.png',
    defaultConfig: {
      image_size: "portrait_16_9",
      num_inference_steps: 28,
      guidance_scale: 6,
      num_images: 2,
      enable_safety_checker: true,
      output_format: "png",
      loras: [{
        path: "https://civitai.com/api/download/models/762939?type=Model&format=SafeTensor",
        scale: 0.9
      }]
    }
  }
];

interface ImageGenerationParams {
  prompt: string;
  expandedPrompt?: string;
  seed?: number;
  modelType?: ModelType;
}

export async function generateImage({ prompt, expandedPrompt, seed, modelType = 'realistic-vision' }: ImageGenerationParams): Promise<{ imageUrl: string, seed: number, expandedPrompt: string | undefined }> {
  const client = fal;

  // Use or generate a seed
  const useSeed = seed || Math.floor(Math.random() * 1000000);

  // Combine prompt with expanded prompt if available
  const fullPrompt = expandedPrompt ? 
    `${prompt}, ${expandedPrompt}, 9:16 aspect ratio, cinematic lighting, high quality, detailed, photorealistic` :
    `${prompt}, 9:16 aspect ratio, cinematic lighting, high quality, detailed, photorealistic`;

  try {
    const result = await client.subscribe("110602490-lcm", {
      input: {
        prompt: fullPrompt,
        seed: useSeed,
        image_size: "512x912",
        sync_mode: true
      }
    });

    // Store the seed with the result
    return {
      imageUrl: result.data.image.url,
      seed: useSeed,
      expandedPrompt: expandedPrompt
    };
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}

// Generate a sequence of images
export async function generateSequence(prompt: string, modelType: ModelType = 'realistic-vision'): Promise<string[]> {
  try {
    const modelInfo = MODELS.find(m => m.id === modelType);
    if (!modelInfo) throw new Error('Invalid model type');

    const config = {
      ...modelInfo.defaultConfig,
      prompt: modelType === 'anime-lora' ? `Juaner_cartoon, ${prompt}` : prompt,
    };

    const modelEndpoint = modelType === 'flux-pro' ? 'fal-ai/flux-pro/v1.1-ultra' : 'fal-ai/flux-lora';
    const result = await fal.subscribe(modelEndpoint, {
      input: config as any,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          console.log(`Generation in progress...`);
          update.logs?.forEach(log => console.log(log.message));
        }
      },
    });

    if (!result.data?.images) {
      throw new Error('No images were generated');
    }

    return result.data.images.map((image: any) => image.url);
  } catch (error) {
    console.error('Error generating images:', error);
    throw error;
  }
}

// Generate a single replacement image
export async function generateSingleImage(prompt: string, modelType: ModelType = 'realistic-vision'): Promise<string> {
  try {
    const modelInfo = MODELS.find(m => m.id === modelType);
    if (!modelInfo) throw new Error('Invalid model type');

    const config = {
      ...modelInfo.defaultConfig,
      num_images: 1,
      prompt: modelType === 'anime-lora' ? `Juaner_cartoon, ${prompt}` : prompt,
    };

    const modelEndpoint = modelType === 'flux-pro' ? 'fal-ai/flux-pro/v1.1-ultra' : 'fal-ai/flux-lora';
    const result = await fal.subscribe(modelEndpoint, {
      input: config as any,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          console.log(`Generation in progress...`);
          update.logs?.forEach(log => console.log(log.message));
        }
      },
    });

    if (!result.data?.images?.[0]) {
      throw new Error('No image was generated');
    }

    return result.data.images[0].url;
  } catch (error) {
    console.error('Error generating single image:', error);
    throw error;
  }
}

// Export the main functions
export const generateImages = generateSequence;