<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\Encoders\WebpEncoder;

class ImageUploadService
{
    protected ImageManager $manager;

    public function __construct()
    {
        $this->manager = new ImageManager(new Driver());
    }

    public function upload(
        UploadedFile $file,
        string $folder = 'feed'
    ): string {

        $directory = public_path("uploads/{$folder}");

        if (!is_dir($directory)) {
            mkdir($directory, 0755, true);
        }

        $filename = Str::uuid() . '.webp';

        $relativePath = "uploads/{$folder}/{$filename}";

        $image = $this->manager->read($file);

        $image
            ->encode(new WebpEncoder(quality: 80))
            ->save(public_path($relativePath));

        return $relativePath;
    }

    public function delete(?string $path): bool
    {
        if (!$path) {
            return false;
        }

        $fullPath = public_path($path);

        if (file_exists($fullPath)) {
            unlink($fullPath);
            return true;
        }

        return false;
    }
}