"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface DigitalSignatureUploaderProps {
  onSave: (signatureUrl: string) => void
}

export function DigitalSignatureUploader({ onSave }: DigitalSignatureUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const processFile = (file: File) => {
    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      alert("Por favor, suba únicamente archivos de imagen.")
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        setPreviewUrl(event.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  const clearPreview = () => {
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const confirmSignature = () => {
    if (previewUrl) {
      onSave(previewUrl)
    }
  }

  return (
    <div className="space-y-4">
      {!previewUrl ? (
        <div
          className={`border-2 border-dashed rounded-md p-6 text-center ${
            isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
          <p className="text-sm text-gray-600 mb-2">
            Arrastre y suelte su firma digital aquí, o
          </p>
          <input
            type="file"
            id="signature-upload"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            aria-label="Subir firma digital"
          />
          <Button 
            variant="outline" 
            onClick={() => fileInputRef.current?.click()}
            type="button"
            size="sm"
          >
            Seleccionar archivo
          </Button>
          <p className="mt-2 text-xs text-gray-500">
            Formatos soportados: JPG, PNG, GIF (máx. 5MB)
          </p>
        </div>
      ) : (
        <div className="border rounded-md p-4 space-y-3">
          <div className="flex justify-between items-center">
            <Label>Vista previa de la firma:</Label>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={clearPreview}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex justify-center bg-white p-2 rounded border">
            <Image
              src={previewUrl}
              alt="Firma digital"
              width={300}
              height={150}
              className="max-h-32 object-contain"
            />
          </div>
          <Button 
            onClick={confirmSignature}
            className="w-full"
          >
            Confirmar firma
          </Button>
        </div>
      )}
    </div>
  )
} 