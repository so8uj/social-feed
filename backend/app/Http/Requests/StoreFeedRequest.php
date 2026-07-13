<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFeedRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    
    public function rules(): array
    {
        return [
            'body' => 'nullable|string|max:5000',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
            'visibility' => 'required|in:public,private',
        ];
    }


    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {

            if (
                blank($this->body) &&
                !$this->hasFile('image')
            ) {
                $validator->errors()->add(
                    'body',
                    'Either body or image is required.'
                );
            }

        });
    }
}