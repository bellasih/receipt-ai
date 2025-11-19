from docling.datamodel.base_models import InputFormat
from docling.document_converter import DocumentConverter, PdfFormatOption
from docling.datamodel.pipeline_options import (
    PdfPipelineOptions,
    RapidOcrOptions,
    OcrMacOptions
)
from docling.datamodel.accelerator_options import AcceleratorOptions, AcceleratorDevice

from receipt_ai.config.config import settings

class OcrInference():
    def __init__(self):
        pass

    def get_result(self, file_path: str):
        pipeline_options = PdfPipelineOptions()
        pipeline_options.do_ocr = True
        pipeline_options.do_table_structure = True
        pipeline_options.table_structure_options.do_cell_matching = True
        
        if settings.DEV_OS == "macos":
            pipeline_options.ocr_options = OcrMacOptions()
        else:
            pipeline_options.ocr_options = RapidOcrOptions()

        pipeline_options.accelerator_options = AcceleratorOptions(
            device=AcceleratorDevice.CPU,
            num_threads=4
        )

        doc_converter = DocumentConverter(
            format_options={
                InputFormat.PDF: PdfFormatOption(pipeline_options=pipeline_options)
            }
        )

        conv_result = doc_converter.convert(file_path)
        doc_filename = conv_result.input.file.stem
        
        return conv_result.document.export_to_markdown(strict_text=True)

