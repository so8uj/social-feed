<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreCommentRequest extends FormRequest
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
            'body' => 'required|string|max:2000',
            'parent_id' => 'nullable|integer|exists:feed_comments,id',
        ];
    }

    public function messages(): array
    {
        return [
            'body.required' => 'Comment is required.',
            'body.max' => 'Comment cannot exceed 2000 characters.',
            'parent_id.exists' => 'Invalid parent comment.',
        ];
    }
}
