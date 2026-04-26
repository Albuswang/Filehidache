(function () {
  "use strict";

  const tools = {
    wordToPdf: {
      page: "convert",
      group: "转为 PDF",
      icon: "description",
      label: "Word 转 PDF",
      description: "提取 DOCX 文档文字并生成可下载 PDF，适合轻量文档和快速归档。",
      accept: ".doc,.docx",
      multiple: true,
      badges: ["DOC / DOCX", "批量", "PDF"],
      help: ["建议使用 .docx", "浏览器本地处理", "处理后可下载"],
      tip: "浏览器版会提取正文生成简洁 PDF；复杂排版、页眉页脚和字体完全还原仍建议接入服务端 Office 渲染引擎。",
      params: [
        { id: "outputName", label: "输出文件名", type: "text", value: "word_to_pdf" }
      ],
      mode: "wordToPdf"
    },
    imageToPdf: {
      page: "convert",
      group: "转为 PDF",
      icon: "image",
      label: "图片转 PDF",
      description: "将 JPG、PNG、WebP 图片按上传顺序合并为一个 PDF。",
      accept: ".jpg,.jpeg,.png,.webp,.bmp",
      multiple: true,
      badges: ["多图合并", "A4 / 原图", "PDF"],
      help: ["支持多张图片", "可设置边距", "单文件下载"],
      tip: "队列顺序就是 PDF 页面顺序，适合扫描件、截图、票据和证件照归档。",
      params: [
        { id: "pageSize", label: "页面尺寸", type: "select", options: ["A4", "A3", "原图尺寸"] },
        { id: "orientation", label: "页面方向", type: "select", options: ["自动", "纵向", "横向"] },
        { id: "margin", label: "边距(px)", type: "number", value: "24" },
        { id: "outputName", label: "输出文件名", type: "text", value: "images_to_pdf" }
      ],
      mode: "imageToPdf"
    },
    pdfToImage: {
      page: "convert",
      group: "从 PDF 转换",
      icon: "image",
      label: "PDF 转图片",
      description: "将 PDF 页面导出为 PNG 或 JPG，多个页面自动打包为 ZIP。",
      accept: ".pdf",
      multiple: false,
      badges: ["PNG / JPG", "页码范围", "ZIP"],
      help: ["PDF 输入", "可选页码", "图片下载"],
      tip: "如果导出多页，系统会自动生成 ZIP 下载包。",
      params: [
        { id: "format", label: "图片格式", type: "select", options: ["PNG", "JPG"] },
        { id: "pages", label: "页码范围", type: "text", value: "", placeholder: "留空全部，例如 1-3,5" },
        { id: "scale", label: "清晰度", type: "select", options: ["标准", "高清", "超清"] }
      ],
      mode: "pdfToImage"
    },
    pdfToWord: {
      page: "convert",
      group: "从 PDF 转换",
      icon: "article",
      label: "PDF 转 Word",
      description: "从 PDF 中提取文字，生成 Word 可打开的 .doc 文档。",
      accept: ".pdf",
      multiple: true,
      badges: ["文字提取", "DOC", "批量"],
      help: ["PDF 输入", "可编辑文本", "下载 DOC"],
      tip: "该模式提取文本内容，扫描件或图片型 PDF 需要 OCR 能力才能识别文字。",
      params: [
        { id: "outputName", label: "输出文件名前缀", type: "text", value: "pdf_to_word" }
      ],
      mode: "pdfToWord"
    },
    pdfToExcel: {
      page: "convert",
      group: "从 PDF 转换",
      icon: "grid_on",
      label: "PDF 转 Excel",
      description: "提取 PDF 文本并生成 CSV 表格文件，方便用 Excel 打开整理。",
      accept: ".pdf",
      multiple: true,
      badges: ["CSV", "批量", "表格整理"],
      help: ["PDF 输入", "文本行导出", "CSV 下载"],
      tip: "浏览器版会按页面文本顺序导出 CSV；复杂表格结构可后续接入专用表格识别引擎。",
      params: [
        { id: "outputName", label: "输出文件名前缀", type: "text", value: "pdf_to_excel" }
      ],
      mode: "pdfToExcel"
    },
    pdfToPpt: {
      page: "convert",
      group: "从 PDF 转换",
      icon: "slideshow",
      label: "PDF 转 PPT",
      description: "将 PDF 每页渲染为图片幻灯片，生成 PowerPoint 可打开的 .ppt 文件。",
      accept: ".pdf",
      multiple: true,
      badges: ["每页一页", "PPT", "图片幻灯片"],
      help: ["PDF 输入", "页面转幻灯片", "PPT 下载"],
      tip: "输出为图片型幻灯片，适合展示与汇报；如需可编辑元素需接入更深度的转换引擎。",
      params: [
        { id: "outputName", label: "输出文件名前缀", type: "text", value: "pdf_to_ppt" }
      ],
      mode: "pdfToPpt"
    },
    pptToPdf: {
      page: "convert",
      group: "转为 PDF",
      icon: "slideshow",
      label: "PPT 转 PDF",
      description: "提取 PPTX 幻灯片文字并生成 PDF，适合快速预览和轻量归档。",
      accept: ".ppt,.pptx",
      multiple: true,
      badges: ["PPTX", "批量", "PDF"],
      help: ["建议使用 .pptx", "一页一张幻灯片", "PDF 下载"],
      tip: "浏览器版会提取幻灯片文字生成 PDF；复杂版式、图表和动画需要服务端 Office 渲染才能完全还原。",
      params: [
        { id: "outputName", label: "输出文件名前缀", type: "text", value: "ppt_to_pdf" }
      ],
      mode: "pptToPdf"
    },
    excelToPdf: {
      page: "convert",
      group: "转为 PDF",
      icon: "table_chart",
      label: "Excel 转 PDF",
      description: "提取 XLSX / CSV 内容并生成简洁 PDF。",
      accept: ".xls,.xlsx,.csv",
      multiple: true,
      badges: ["XLSX / CSV", "PDF", "批量"],
      help: ["表格输入", "文本排版", "PDF 下载"],
      tip: "适合快速预览和轻量表格归档；精确分页与打印版式建议接入电子表格渲染引擎。",
      params: [
        { id: "outputName", label: "输出文件名前缀", type: "text", value: "excel_to_pdf" }
      ],
      mode: "excelToPdf"
    },
    pdfMerge: {
      page: "merge",
      group: "PDF 整理",
      icon: "call_merge",
      label: "PDF 合并",
      description: "将多个 PDF 与图片按队列顺序合并成一个 PDF。",
      accept: ".pdf,.jpg,.jpeg,.png,.webp",
      multiple: true,
      badges: ["PDF + 图片", "顺序合并", "单 PDF"],
      help: ["可混合上传", "队列顺序合并", "PDF 下载"],
      tip: "上传队列的顺序就是合并顺序；可以删除不需要的文件后再处理。",
      params: [
        { id: "outputName", label: "输出文件名", type: "text", value: "merged_document" }
      ],
      mode: "pdfMerge"
    },
    pdfSplit: {
      page: "merge",
      group: "PDF 整理",
      icon: "content_cut",
      label: "PDF 拆分",
      description: "按单页、每 N 页、指定页或页码组拆分 PDF，结果打包 ZIP。",
      accept: ".pdf",
      multiple: false,
      badges: ["拆分", "页码范围", "ZIP"],
      help: ["PDF 输入", "灵活规则", "ZIP 下载"],
      tip: "示例：每 3 页拆分填 3；提取页填 1-3,5；页码组填 1-2,3-4。",
      params: [
        { id: "splitMode", label: "拆分方式", type: "select", options: ["按页拆分", "每 N 页拆分", "提取指定页面", "按页码组拆分"] },
        { id: "rule", label: "拆分规则", type: "text", value: "", placeholder: "例如 3 / 1-3,5 / 1-2,3-4" },
        { id: "outputName", label: "输出包名", type: "text", value: "split_pdf" }
      ],
      mode: "pdfSplit"
    },
    pdfDelete: {
      page: "merge",
      group: "PDF 整理",
      icon: "delete",
      label: "删除 PDF 页面",
      description: "删除 PDF 中指定页面，生成新的 PDF 文件。",
      accept: ".pdf",
      multiple: false,
      badges: ["删除页码", "新 PDF", "不覆盖原件"],
      help: ["支持 2,5,8", "支持 4-7", "下载新文件"],
      tip: "页码从 1 开始，多个页码用逗号分隔，连续页码用短横线。",
      params: [
        { id: "pages", label: "删除页码", type: "text", value: "", placeholder: "例如 2,5,8 或 4-7" },
        { id: "outputName", label: "输出文件名", type: "text", value: "deleted_pages" }
      ],
      mode: "pdfDelete"
    },
    pdfSort: {
      page: "merge",
      group: "PDF 整理",
      icon: "reorder",
      label: "PDF 页面排序",
      description: "按输入的新页码顺序重建 PDF。",
      accept: ".pdf",
      multiple: false,
      badges: ["自定义顺序", "重建 PDF", "下载"],
      help: ["完整页码序列", "不可重复", "新 PDF"],
      tip: "必须包含全部页面且不重复，例如原 PDF 4 页可填 1,3,2,4。",
      params: [
        { id: "order", label: "新页码顺序", type: "text", value: "", placeholder: "例如 1,3,2,4" },
        { id: "outputName", label: "输出文件名", type: "text", value: "sorted_pdf" }
      ],
      mode: "pdfSort"
    },
    pdfRotate: {
      page: "merge",
      group: "PDF 整理",
      icon: "rotate_right",
      label: "PDF 页面旋转",
      description: "将全部页面或指定页面旋转 90、180 或 270 度。",
      accept: ".pdf",
      multiple: false,
      badges: ["批量旋转", "指定页", "新 PDF"],
      help: ["留空表示全部", "支持页码范围", "下载新文件"],
      tip: "如果只要旋转部分页面，请填写页码范围，例如 2,4-6。",
      params: [
        { id: "pages", label: "旋转页码", type: "text", value: "", placeholder: "留空全部，例如 2,4-6" },
        { id: "angle", label: "旋转角度", type: "select", options: ["90", "180", "270"] },
        { id: "outputName", label: "输出文件名", type: "text", value: "rotated_pdf" }
      ],
      mode: "pdfRotate"
    },
    pdfCompress: {
      page: "compress",
      group: "文件瘦身",
      icon: "compress",
      label: "PDF 压缩",
      description: "将 PDF 页面重新渲染为压缩图片后生成新 PDF，适合扫描件和图片型 PDF。",
      accept: ".pdf",
      multiple: false,
      badges: ["低 / 中 / 高", "扫描件友好", "PDF 下载"],
      help: ["PDF 输入", "压缩比显示", "新 PDF"],
      tip: "该方法对扫描件效果明显；纯文本 PDF 原本很小，压缩空间会有限，并会失去可选中文字。",
      params: [
        { id: "level", label: "压缩等级", type: "select", options: ["低压缩", "中压缩", "高压缩"] },
        { id: "outputName", label: "输出文件名", type: "text", value: "compressed_pdf" }
      ],
      mode: "pdfCompress"
    },
    imageCompress: {
      page: "compress",
      group: "文件瘦身",
      icon: "photo_size_select_small",
      label: "图片压缩",
      description: "批量压缩图片，可设置输出格式、质量和最大宽度。",
      accept: ".jpg,.jpeg,.png,.webp",
      multiple: true,
      badges: ["批量", "格式转换", "质量控制"],
      help: ["JPG / PNG / WebP", "批量下载", "ZIP 打包"],
      tip: "JPG / WebP 通常瘦身更明显；PNG 适合保留透明背景。",
      params: [
        { id: "format", label: "输出格式", type: "select", options: ["JPG", "WebP", "PNG"] },
        { id: "quality", label: "压缩质量", type: "range", min: "35", max: "95", step: "1", value: "76" },
        { id: "maxWidth", label: "最大宽度", type: "select", options: ["保持原宽", "2400", "1920", "1280", "960"] },
        { id: "suffix", label: "文件名后缀", type: "text", value: "_compressed" }
      ],
      mode: "imageCompress"
    },
    docCompress: {
      page: "compress",
      group: "文件瘦身",
      icon: "draft",
      label: "Word / PPT 瘦身",
      description: "重压缩 DOCX / PPTX 内嵌图片并重新打包，减小文档体积。",
      accept: ".doc,.docx,.ppt,.pptx",
      multiple: true,
      badges: ["DOCX / PPTX", "图片重压缩", "保持可编辑"],
      help: ["建议 DOCX / PPTX", "批量", "新文件下载"],
      tip: "新版会跳过已经很小的图片，只压缩可优化媒体；旧版 .doc/.ppt 需要桌面或服务端工具。",
      params: [
        { id: "level", label: "压缩等级", type: "select", options: ["轻度", "均衡", "强力"] },
        { id: "maxWidth", label: "内嵌图片最大宽度", type: "select", options: ["保持原宽", "2400", "1920", "1280", "960"] },
        { id: "suffix", label: "文件名后缀", type: "text", value: "_slim" }
      ],
      mode: "docCompress"
    },
    protectPdf: {
      page: "security",
      group: "安全工具",
      icon: "lock",
      label: "PDF 加密",
      description: "为 PDF 设置打开密码和权限控制。",
      accept: ".pdf",
      multiple: false,
      badges: ["密码", "权限", "需加密引擎"],
      help: ["PDF 输入", "设置密码", "安全输出"],
      tip: "浏览器内置 PDF 库不提供可靠加密写入；页面已独立接入，生产版需要后端安全加密模块。",
      params: [
        { id: "password", label: "打开密码", type: "text", value: "", placeholder: "输入密码" },
        { id: "outputName", label: "输出文件名", type: "text", value: "protected_pdf" }
      ],
      mode: "protectPdf"
    },
    unlockPdf: {
      page: "security",
      group: "安全工具",
      icon: "lock_open",
      label: "PDF 解密",
      description: "在已知密码时解除 PDF 保护。",
      accept: ".pdf",
      multiple: false,
      badges: ["密码验证", "解锁", "需解密引擎"],
      help: ["PDF 输入", "输入密码", "下载输出"],
      tip: "加密 PDF 的解密需要支持密码的 PDF 引擎；当前页面提供完整入口和校验提示。",
      params: [
        { id: "password", label: "当前密码", type: "text", value: "", placeholder: "输入密码" },
        { id: "outputName", label: "输出文件名", type: "text", value: "unlocked_pdf" }
      ],
      mode: "unlockPdf"
    }
  };

  const zhToolCopy = {
    wordToPdf: {
      group: "转为 PDF",
      label: "Word 转 PDF",
      description: "将 Word 文档整理为 PDF，适合简历、报告、合同等轻量归档场景。",
      badges: ["DOC / DOCX", "批量处理", "导出 PDF"],
      help: ["建议上传 .docx", "本地处理", "结果可下载"],
      tip: "当前浏览器版会提取正文生成 PDF。若需要完整还原页眉、表格、字体和复杂版式，建议接入服务端 Office 渲染。",
      params: [{ id: "outputName", label: "输出文件名", type: "text", value: "word_to_pdf" }]
    },
    imageToPdf: {
      group: "转为 PDF",
      label: "图片转 PDF",
      description: "把多张图片按顺序合成为一个 PDF，适合扫描件、票据和截图整理。",
      badges: ["多图合并", "页面尺寸", "单个 PDF"],
      help: ["支持多张图片", "可调边距", "一键下载"],
      tip: "文件列表中的顺序就是 PDF 的页面顺序。需要调整顺序时，可先在列表中上移或下移文件。",
      params: [
        { id: "pageSize", label: "页面尺寸", type: "select", options: ["A4", "A3", "原图尺寸"] },
        { id: "orientation", label: "页面方向", type: "select", options: ["自动", "纵向", "横向"] },
        { id: "margin", label: "页面边距(px)", type: "number", value: "24" },
        { id: "outputName", label: "输出文件名", type: "text", value: "images_to_pdf" }
      ]
    },
    pdfToImage: {
      group: "从 PDF 转换",
      label: "PDF 转图片",
      description: "将 PDF 页面导出为 PNG 或 JPG，多页文件会自动打包为 ZIP。",
      badges: ["PNG / JPG", "指定页码", "ZIP 下载"],
      help: ["上传 PDF", "可选页码", "图片导出"],
      tip: "如果只需要部分页面，可以填写页码范围，例如 1-3,5。",
      params: [
        { id: "format", label: "图片格式", type: "select", options: ["PNG", "JPG"] },
        { id: "pages", label: "页码范围", type: "text", value: "", placeholder: "留空为全部，例如 1-3,5" },
        { id: "scale", label: "导出清晰度", type: "select", options: ["标准", "高清", "超清"] }
      ]
    },
    pdfToWord: {
      group: "从 PDF 转换",
      label: "PDF 转 Word",
      description: "提取 PDF 中的文字内容，生成可用 Word 打开的文档。",
      badges: ["文字提取", "DOC 文档", "批量处理"],
      help: ["上传 PDF", "导出文本", "下载 DOC"],
      tip: "该功能适合文字型 PDF。扫描件或图片型 PDF 需要 OCR 才能识别文字。",
      params: [{ id: "outputName", label: "文件名前缀", type: "text", value: "pdf_to_word" }]
    },
    pdfToExcel: {
      group: "从 PDF 转换",
      label: "PDF 转 Excel",
      description: "将 PDF 文本整理为 CSV，方便用 Excel 继续编辑。",
      badges: ["CSV 导出", "批量处理", "表格整理"],
      help: ["上传 PDF", "按行导出", "下载 CSV"],
      tip: "当前版本会按文本顺序导出。复杂表格的结构识别，可在后续接入专用表格识别能力。",
      params: [{ id: "outputName", label: "文件名前缀", type: "text", value: "pdf_to_excel" }]
    },
    pdfToPpt: {
      group: "从 PDF 转换",
      label: "PDF 转 PPT",
      description: "将 PDF 页面转成图片型幻灯片，适合快速展示和汇报。",
      badges: ["一页一张", "PPT 文件", "图片幻灯片"],
      help: ["上传 PDF", "页面转幻灯片", "下载 PPT"],
      tip: "导出的 PPT 以图片页为主，适合展示；如需可编辑元素，需要更深度的转换引擎。",
      params: [{ id: "outputName", label: "文件名前缀", type: "text", value: "pdf_to_ppt" }]
    },
    pptToPdf: {
      group: "转为 PDF",
      label: "PPT 转 PDF",
      description: "将 PPTX 内容整理为 PDF，方便分享、归档或打印。",
      badges: ["PPTX", "批量处理", "导出 PDF"],
      help: ["建议上传 .pptx", "文本归档", "下载 PDF"],
      tip: "当前浏览器版会提取幻灯片文字生成 PDF。复杂背景、动画和图表还原，需要 Office 渲染服务支持。",
      params: [{ id: "outputName", label: "文件名前缀", type: "text", value: "ppt_to_pdf" }]
    },
    excelToPdf: {
      group: "转为 PDF",
      label: "Excel 转 PDF",
      description: "将表格内容整理成简洁 PDF，适合轻量预览和归档。",
      badges: ["XLSX / CSV", "导出 PDF", "批量处理"],
      help: ["上传表格", "文本排版", "下载 PDF"],
      tip: "当前版本适合轻量表格。若需要精确分页、打印区域和样式还原，建议接入表格渲染引擎。",
      params: [{ id: "outputName", label: "文件名前缀", type: "text", value: "excel_to_pdf" }]
    },
    pdfMerge: {
      group: "PDF 整理",
      label: "合并 PDF",
      description: "将多个 PDF 和图片按列表顺序合成为一个 PDF。",
      badges: ["PDF + 图片", "按序合并", "单个 PDF"],
      help: ["支持混合上传", "可调整顺序", "下载 PDF"],
      tip: "合并顺序以文件列表为准。处理前可以删除不需要的文件，或调整上下顺序。",
      params: [{ id: "outputName", label: "输出文件名", type: "text", value: "merged_document" }]
    },
    pdfSplit: {
      group: "PDF 整理",
      label: "拆分 PDF",
      description: "按单页、每 N 页、指定页或页码组拆分 PDF，结果会打包下载。",
      badges: ["灵活拆分", "页码范围", "ZIP 下载"],
      help: ["上传 PDF", "填写规则", "打包下载"],
      tip: "示例：每 3 页拆分填 3；提取指定页填 1-3,5；按组拆分填 1-2,3-4。",
      params: [
        { id: "splitMode", label: "拆分方式", type: "select", options: ["按页拆分", "每 N 页拆分", "提取指定页面", "按页码组拆分"] },
        { id: "rule", label: "拆分规则", type: "text", value: "", placeholder: "例如 3 / 1-3,5 / 1-2,3-4" },
        { id: "outputName", label: "压缩包名称", type: "text", value: "split_pdf" }
      ]
    },
    pdfDelete: {
      group: "PDF 整理",
      label: "删除页面",
      description: "删除 PDF 中不需要的页面，并生成新的 PDF 文件。",
      badges: ["指定页码", "生成新文件", "不覆盖原件"],
      help: ["支持 2,5,8", "支持 4-7", "下载新 PDF"],
      tip: "页码从 1 开始。多个页码用英文逗号分隔，连续页码用短横线表示。",
      params: [
        { id: "pages", label: "要删除的页码", type: "text", value: "", placeholder: "例如 2,5,8 或 4-7" },
        { id: "outputName", label: "输出文件名", type: "text", value: "deleted_pages" }
      ]
    },
    pdfSort: {
      group: "PDF 整理",
      label: "页面排序",
      description: "按你填写的新顺序重新生成 PDF。",
      badges: ["自定义顺序", "重建 PDF", "下载新文件"],
      help: ["完整页码", "不可重复", "新 PDF"],
      tip: "需要包含全部页码且不能重复。例如 4 页文件可填写 1,3,2,4。",
      params: [
        { id: "order", label: "新的页码顺序", type: "text", value: "", placeholder: "例如 1,3,2,4" },
        { id: "outputName", label: "输出文件名", type: "text", value: "sorted_pdf" }
      ]
    },
    pdfRotate: {
      group: "PDF 整理",
      label: "旋转页面",
      description: "旋转全部页面，或只旋转指定页面。",
      badges: ["批量旋转", "指定页码", "生成新 PDF"],
      help: ["留空为全部", "支持页码范围", "下载新文件"],
      tip: "如果只处理部分页面，请填写页码范围，例如 2,4-6。",
      params: [
        { id: "pages", label: "要旋转的页码", type: "text", value: "", placeholder: "留空为全部，例如 2,4-6" },
        { id: "angle", label: "旋转角度", type: "select", options: ["90", "180", "270"] },
        { id: "outputName", label: "输出文件名", type: "text", value: "rotated_pdf" }
      ]
    },
    pdfCompress: {
      group: "文件压缩",
      label: "压缩 PDF",
      description: "压缩扫描件或图片型 PDF，减小文件体积。",
      badges: ["三档压缩", "适合扫描件", "下载 PDF"],
      help: ["上传 PDF", "查看节省大小", "生成新文件"],
      tip: "该方式对扫描件更明显。纯文本 PDF 原本体积较小，压缩空间通常有限。",
      params: [
        { id: "level", label: "压缩强度", type: "select", options: ["低压缩", "中压缩", "高压缩"] },
        { id: "outputName", label: "输出文件名", type: "text", value: "compressed_pdf" }
      ]
    },
    imageCompress: {
      group: "文件压缩",
      label: "压缩图片",
      description: "批量压缩图片，可调整格式、质量和最大宽度。",
      badges: ["批量处理", "格式转换", "质量可调"],
      help: ["JPG / PNG / WebP", "可批量下载", "支持打包"],
      tip: "JPG 和 WebP 通常压缩效果更好；PNG 更适合保留透明背景。",
      params: [
        { id: "format", label: "输出格式", type: "select", options: ["JPG", "WebP", "PNG"] },
        { id: "quality", label: "图片质量", type: "range", min: "35", max: "95", step: "1", value: "76" },
        { id: "maxWidth", label: "最大宽度", type: "select", options: ["保持原宽", "2400", "1920", "1280", "960"] },
        { id: "suffix", label: "文件名后缀", type: "text", value: "_compressed" }
      ]
    },
    docCompress: {
      group: "文件压缩",
      label: "压缩 Word / PPT",
      description: "压缩 DOCX / PPTX 内的图片素材，尽量保留可编辑性。",
      badges: ["DOCX / PPTX", "图片优化", "保持可编辑"],
      help: ["建议新版格式", "批量处理", "下载新文件"],
      tip: "该功能主要优化文档内图片。旧版 .doc / .ppt 需要桌面软件或服务端工具处理。",
      params: [
        { id: "level", label: "压缩强度", type: "select", options: ["轻度", "均衡", "强力"] },
        { id: "maxWidth", label: "图片最大宽度", type: "select", options: ["保持原宽", "2400", "1920", "1280", "960"] },
        { id: "suffix", label: "文件名后缀", type: "text", value: "_slim" }
      ]
    },
    protectPdf: {
      group: "安全工具",
      label: "PDF 加密",
      description: "为 PDF 设置打开密码和权限限制。",
      badges: ["打开密码", "权限控制", "需安全引擎"],
      help: ["上传 PDF", "设置密码", "安全输出"],
      tip: "可靠的 PDF 加密需要专门的安全引擎。当前页面已准备好入口和参数，适合后续接入生产模块。",
      params: [
        { id: "password", label: "打开密码", type: "text", value: "", placeholder: "输入密码" },
        { id: "outputName", label: "输出文件名", type: "text", value: "protected_pdf" }
      ]
    },
    unlockPdf: {
      group: "安全工具",
      label: "PDF 解密",
      description: "在知道密码的情况下解除 PDF 保护。",
      badges: ["密码验证", "解除保护", "需安全引擎"],
      help: ["上传 PDF", "输入密码", "下载结果"],
      tip: "加密 PDF 需要支持密码的 PDF 引擎才能可靠解密。当前工作台保留完整入口，便于后续接入。",
      params: [
        { id: "password", label: "当前密码", type: "text", value: "", placeholder: "输入密码" },
        { id: "outputName", label: "输出文件名", type: "text", value: "unlocked_pdf" }
      ]
    }
  };
  let currentLang = localStorage.getItem("filestream-language") === "zh" ? "zh" : "en";
  applyToolCopy(currentLang);

  const pageTools = {
    convert: ["wordToPdf", "imageToPdf", "pdfToImage", "pdfToWord", "pdfToExcel", "pdfToPpt", "pptToPdf", "excelToPdf"],
    compress: ["pdfCompress", "imageCompress", "docCompress"],
    merge: ["pdfMerge", "pdfSplit", "pdfDelete", "pdfSort", "pdfRotate"],
    security: ["protectPdf", "unlockPdf"]
  };

  const pageMeta = {
    en: {
      tools: { title: "Professional file tools", intro: "Choose a tool and open its dedicated workspace." },
      convert: { title: "Convert Workspace", intro: "Convert Word, PowerPoint, Excel, images, and PDF files with a focused workflow." },
      compress: { title: "Compression Workspace", intro: "Reduce PDF, image, Word, and PowerPoint file sizes, then download the optimized output." },
      merge: { title: "PDF Organize Workspace", intro: "Merge, split, delete, reorder, and rotate PDF pages." },
      security: { title: "Security Workspace", intro: "Dedicated entry points for PDF protection and unlocking workflows." }
    },
    zh: {
      tools: { title: "专业文件处理工具", intro: "选择工具并进入对应的独立工作台。" },
      convert: { title: "转换工作台", intro: "处理 Word、PPT、Excel、图片与 PDF 的常用格式转换。" },
      compress: { title: "压缩工作台", intro: "压缩 PDF、图片、Word 与 PPT，完成后直接下载优化结果。" },
      merge: { title: "PDF 整理工作台", intro: "合并、拆分、删除、排序和旋转 PDF 页面。" },
      security: { title: "安全工作台", intro: "PDF 加密与解密的独立入口。" }
    }
  };

  function applyToolCopy(lang) {
    const englishCopy = {
      wordToPdf: {
        group: "Convert to PDF",
        label: "Word to PDF",
        description: "Extract text from DOCX files and generate a clean, downloadable PDF.",
        badges: ["DOC / DOCX", "Batch", "PDF"],
        help: ["DOCX recommended", "Local workflow", "Download ready"],
        tip: "This browser workflow creates a clean text-based PDF. Exact Word layout rendering still requires an Office rendering engine.",
        params: [{ id: "outputName", label: "Output name", type: "text", value: "word_to_pdf" }]
      },
      imageToPdf: {
        group: "Convert to PDF",
        label: "Image to PDF",
        description: "Combine JPG, PNG, WebP, or BMP images into one PDF in upload order.",
        badges: ["Multi-image", "A4 / Original", "PDF"],
        help: ["Multiple images", "Margin control", "Single download"],
        tip: "The queue order becomes the PDF page order.",
        params: [
          { id: "pageSize", label: "Page size", type: "select", options: ["A4", "A3", "Original size"] },
          { id: "orientation", label: "Orientation", type: "select", options: ["Auto", "Portrait", "Landscape"] },
          { id: "margin", label: "Margin (px)", type: "number", value: "24" },
          { id: "outputName", label: "Output name", type: "text", value: "images_to_pdf" }
        ]
      },
      pdfToImage: {
        group: "Convert from PDF",
        label: "PDF to Images",
        description: "Export PDF pages as PNG or JPG. Multi-page output is packaged as ZIP.",
        badges: ["PNG / JPG", "Page range", "ZIP"],
        help: ["PDF input", "Optional pages", "Image download"],
        tip: "Exporting multiple pages creates one ZIP package automatically.",
        params: [
          { id: "format", label: "Image format", type: "select", options: ["PNG", "JPG"] },
          { id: "pages", label: "Page range", type: "text", value: "", placeholder: "Leave blank for all, e.g. 1-3,5" },
          { id: "scale", label: "Quality", type: "select", options: ["Standard", "High", "Ultra"] }
        ]
      },
      pdfToWord: {
        group: "Convert from PDF",
        label: "PDF to Word",
        description: "Extract PDF text into a Word-openable document.",
        badges: ["Text extract", "DOC", "Batch"],
        help: ["PDF input", "Editable text", "DOC download"],
        tip: "This extracts text. Scanned PDFs need OCR for real text recognition.",
        params: [{ id: "outputName", label: "Output prefix", type: "text", value: "pdf_to_word" }]
      },
      pdfToExcel: {
        group: "Convert from PDF",
        label: "PDF to Excel",
        description: "Extract PDF text into a CSV file that opens in Excel.",
        badges: ["CSV", "Batch", "Tables"],
        help: ["PDF input", "Line export", "CSV download"],
        tip: "Complex table reconstruction can be added later with a dedicated table extraction engine.",
        params: [{ id: "outputName", label: "Output prefix", type: "text", value: "pdf_to_excel" }]
      },
      pdfToPpt: {
        group: "Convert from PDF",
        label: "PDF to PowerPoint",
        description: "Render each PDF page as an image slide in a PowerPoint-openable file.",
        badges: ["One page per slide", "PPT", "Image slides"],
        help: ["PDF input", "Slide export", "PPT download"],
        tip: "The output uses image-based slides. Editable slide objects require a deeper conversion engine.",
        params: [{ id: "outputName", label: "Output prefix", type: "text", value: "pdf_to_ppt" }]
      },
      pptToPdf: {
        group: "Convert to PDF",
        label: "PowerPoint to PDF",
        description: "Extract PPTX slide text and generate a lightweight PDF.",
        badges: ["PPTX", "Batch", "PDF"],
        help: ["PPTX recommended", "Slide text", "PDF download"],
        tip: "Exact PowerPoint layout rendering still requires an Office rendering engine.",
        params: [{ id: "outputName", label: "Output prefix", type: "text", value: "ppt_to_pdf" }]
      },
      excelToPdf: {
        group: "Convert to PDF",
        label: "Excel to PDF",
        description: "Extract XLSX or CSV content and generate a clean PDF.",
        badges: ["XLSX / CSV", "PDF", "Batch"],
        help: ["Spreadsheet input", "Text layout", "PDF download"],
        tip: "Precise print pagination can be added later with a spreadsheet rendering engine.",
        params: [{ id: "outputName", label: "Output prefix", type: "text", value: "excel_to_pdf" }]
      },
      pdfMerge: {
        group: "PDF Tools",
        label: "Merge PDF",
        description: "Merge multiple PDFs and images into one PDF in queue order.",
        badges: ["PDF + images", "Ordered merge", "Single PDF"],
        help: ["Mixed upload", "Queue order", "PDF download"],
        tip: "The queue order is the final merge order.",
        params: [{ id: "outputName", label: "Output name", type: "text", value: "merged_document" }]
      },
      pdfSplit: {
        group: "PDF Tools",
        label: "Split PDF",
        description: "Split a PDF by page, by every N pages, by selected pages, or by page groups.",
        badges: ["Split", "Page range", "ZIP"],
        help: ["PDF input", "Flexible rules", "ZIP download"],
        tip: "Examples: every 3 pages = 3; extract pages = 1-3,5; groups = 1-2,3-4.",
        params: [
          { id: "splitMode", label: "Split mode", type: "select", options: ["Split by page", "Split every N pages", "Extract selected pages", "Split by page groups"] },
          { id: "rule", label: "Split rule", type: "text", value: "", placeholder: "e.g. 3 / 1-3,5 / 1-2,3-4" },
          { id: "outputName", label: "Package name", type: "text", value: "split_pdf" }
        ]
      },
      pdfDelete: {
        group: "PDF Tools",
        label: "Delete PDF Pages",
        description: "Remove selected pages and generate a new PDF.",
        badges: ["Page removal", "New PDF", "No overwrite"],
        help: ["Supports 2,5,8", "Supports 4-7", "Download output"],
        tip: "Page numbers start at 1. Use commas for multiple pages and hyphens for ranges.",
        params: [
          { id: "pages", label: "Pages to delete", type: "text", value: "", placeholder: "e.g. 2,5,8 or 4-7" },
          { id: "outputName", label: "Output name", type: "text", value: "deleted_pages" }
        ]
      },
      pdfSort: {
        group: "PDF Tools",
        label: "Reorder PDF Pages",
        description: "Rebuild a PDF with a custom page order.",
        badges: ["Custom order", "New PDF", "Download"],
        help: ["Full sequence", "No duplicates", "New PDF"],
        tip: "Include every page exactly once, for example 1,3,2,4.",
        params: [
          { id: "order", label: "New page order", type: "text", value: "", placeholder: "e.g. 1,3,2,4" },
          { id: "outputName", label: "Output name", type: "text", value: "sorted_pdf" }
        ]
      },
      pdfRotate: {
        group: "PDF Tools",
        label: "Rotate PDF Pages",
        description: "Rotate all or selected PDF pages by 90, 180, or 270 degrees.",
        badges: ["Batch rotate", "Selected pages", "New PDF"],
        help: ["Blank = all", "Page ranges", "Download output"],
        tip: "Leave page range blank to rotate every page.",
        params: [
          { id: "pages", label: "Pages to rotate", type: "text", value: "", placeholder: "Blank for all, e.g. 2,4-6" },
          { id: "angle", label: "Angle", type: "select", options: ["90", "180", "270"] },
          { id: "outputName", label: "Output name", type: "text", value: "rotated_pdf" }
        ]
      },
      pdfCompress: {
        group: "Compression",
        label: "Compress PDF",
        description: "Re-render PDF pages with image compression, best for scanned or image-heavy PDFs.",
        badges: ["Low / Medium / High", "Scans", "PDF download"],
        help: ["PDF input", "Size comparison", "New PDF"],
        tip: "Compression is strongest on scanned PDFs. Text-only PDFs may already be optimized.",
        params: [
          { id: "level", label: "Compression level", type: "select", options: ["Low", "Medium", "High"] },
          { id: "outputName", label: "Output name", type: "text", value: "compressed_pdf" }
        ]
      },
      imageCompress: {
        group: "Compression",
        label: "Compress Images",
        description: "Batch-compress images with output format, quality, and width controls.",
        badges: ["Batch", "Format control", "Quality"],
        help: ["JPG / PNG / WebP", "Batch download", "ZIP ready"],
        tip: "JPG and WebP usually produce the strongest size reduction.",
        params: [
          { id: "format", label: "Output format", type: "select", options: ["JPG", "WebP", "PNG"] },
          { id: "quality", label: "Quality", type: "range", min: "35", max: "95", step: "1", value: "76" },
          { id: "maxWidth", label: "Max width", type: "select", options: ["Keep original width", "2400", "1920", "1280", "960"] },
          { id: "suffix", label: "Filename suffix", type: "text", value: "_compressed" }
        ]
      },
      docCompress: {
        group: "Compression",
        label: "Word / PPT Slim",
        description: "Recompress embedded images in DOCX / PPTX files and rebuild the package.",
        badges: ["DOCX / PPTX", "Media recompress", "Editable"],
        help: ["DOCX / PPTX", "Batch", "Download output"],
        tip: "Legacy .doc and .ppt files require desktop or server-side tooling.",
        params: [
          { id: "level", label: "Compression level", type: "select", options: ["Light", "Balanced", "Strong"] },
          { id: "maxWidth", label: "Embedded image max width", type: "select", options: ["Keep original width", "2400", "1920", "1280", "960"] },
          { id: "suffix", label: "Filename suffix", type: "text", value: "_slim" }
        ]
      },
      protectPdf: {
        group: "Security",
        label: "Protect PDF",
        description: "Set open-password and permission controls for a PDF.",
        badges: ["Password", "Permissions", "Engine required"],
        help: ["PDF input", "Set password", "Secure output"],
        tip: "Reliable PDF encryption requires a security-capable PDF engine. The UI is ready for that production module.",
        params: [
          { id: "password", label: "Open password", type: "text", value: "", placeholder: "Enter password" },
          { id: "outputName", label: "Output name", type: "text", value: "protected_pdf" }
        ]
      },
      unlockPdf: {
        group: "Security",
        label: "Unlock PDF",
        description: "Remove PDF protection when the correct password is available.",
        badges: ["Password", "Unlock", "Engine required"],
        help: ["PDF input", "Enter password", "Download output"],
        tip: "Encrypted PDFs require a password-aware PDF engine. The workspace and validation flow are ready.",
        params: [
          { id: "password", label: "Current password", type: "text", value: "", placeholder: "Enter password" },
          { id: "outputName", label: "Output name", type: "text", value: "unlocked_pdf" }
        ]
      }
    };

    const source = lang === "zh" ? zhToolCopy : englishCopy;
    Object.entries(source).forEach(([key, value]) => {
      Object.assign(tools[key], value);
    });
  }

  const staticCopy = {
    en: {
      navTools: "Tools",
      navCompress: "Compress",
      navConvert: "Convert",
      navOrganize: "Organize",
      navSecurity: "Security",
      langToggle: "中文",
      homeGhost: "Open workspace",
      homePrimary: "Start processing",
      homeEyebrow: "Local-first file workflow",
      homeTitle: "File processing, reduced to three elegant steps.",
      homeIntro: "Upload files, choose a dedicated tool, then download the finished output. Conversion, compression, PDF organization, and security tools now live on focused pages.",
      homeSelect: "Select files",
      homeBrowse: "Browse tools",
      trustOne: "Download-ready output",
      trustTwo: "Browser-first processing",
      trustThree: "Dedicated workspaces",
      briefEyebrow: "Precision workspace",
      briefTitle: "Dedicated pages for every document task.",
      briefIntro: "Instead of a decorative upload box, this panel highlights what the product now does best: clean routing, visible downloads, and focused workspaces.",
      briefMetricOne: "Workspace pages",
      briefMetricTwo: "Tool entries",
      briefMetricThree: "Floating download dock",
      briefFlowOne: "Choose tool",
      briefFlowTwo: "Process locally",
      briefFlowThree: "Download output",
      toolLibrary: "Tool Library",
      toolLibraryIntro: "Every entry opens its own workspace instead of stacking tools on one long page.",
      viewCompression: "View compression tools",
      featureOneTitle: "Download made obvious",
      featureOneText: "Each workspace includes a results panel plus a floating download dock after processing completes.",
      featureTwoTitle: "Separate pages",
      featureTwoText: "Convert, compress, organize, and security tools each have their own URL and workflow.",
      featureThreeTitle: "Clear capability boundaries",
      featureThreeText: "Browser-ready tools run immediately. Engine-dependent security actions are clearly marked.",
      footerHome: "Files are used for the current session only. Output is ready for direct download.",
      workspaceGhost: "Home",
      convertCta: "Compress files",
      compressCta: "Organize PDF",
      mergeCta: "Security tools",
      securityCta: "Convert tools",
      convertRail: "Convert tools",
      compressRail: "Compression tools",
      mergeRail: "PDF tools",
      securityRail: "Security tools",
      tool: "Tool",
      uploadStart: "Upload files and start processing.",
      defaultMessage: "Choose a tool, upload files, process them, then download the output.",
      securityMessage: "Security tools have their own page. Encryption and unlocking require a password-aware PDF engine.",
      uploadFiles: "Upload files",
      supportedFormats: "Supported formats change with the selected tool.",
      browseFiles: "Browse files",
      filesToProcess: "Files to process",
      zeroFiles: "0 files",
      preview: "Preview",
      noFile: "No file selected",
      previewArea: "Preview area",
      previewEmpty: "Select a queued file to preview it here.",
      settings: "Settings",
      start: "Start processing",
      clear: "Clear workspace",
      notes: "Tool notes will appear here.",
      downloads: "Downloads",
      downloadText: "Processed files are saved through your browser.",
      securityDownloadText: "Security outputs will appear here after the production engine is connected.",
      downloadAll: "Download all",
      downloadLatest: "Download latest file",
      footerConvert: "Download buttons appear as soon as conversion finishes.",
      footerCompress: "Before-and-after file sizes appear in the output details.",
      footerMerge: "Queue order controls the merged PDF order.",
      footerSecurity: "Security operations should use a reliable encryption engine.",
      estimatedSize: "Estimated size:",
      outputSize: "Output size:",
      totalSaving: "Total saving:",
      compressNow: "Compress Now"
    },
    zh: {
      navTools: "工具",
      navCompress: "压缩",
      navConvert: "转换",
      navOrganize: "整理",
      navSecurity: "安全",
      langToggle: "EN",
      homeGhost: "Open workspace",
      homePrimary: "Start processing",
      homeEyebrow: "Local-first file workflow",
      homeTitle: "File processing, reduced to three elegant steps.",
      homeIntro: "Upload files, choose a dedicated tool, then download the finished output. Conversion, compression, PDF organization, and security tools now live on focused pages.",
      homeSelect: "Select files",
      homeBrowse: "Browse tools",
      trustOne: "Download-ready output",
      trustTwo: "Browser-first processing",
      trustThree: "Dedicated workspaces",
      briefEyebrow: "精密工作台",
      briefTitle: "每一类文档任务都有专属页面。",
      briefIntro: "这里不再放没有实际意义的上传框，而是展示产品核心能力：清晰路由、醒目下载和聚焦工作台。",
      briefMetricOne: "工作台页面",
      briefMetricTwo: "工具入口",
      briefMetricThree: "固定下载浮层",
      briefFlowOne: "选择工具",
      briefFlowTwo: "本地处理",
      briefFlowThree: "下载结果",
      toolLibrary: "工具库",
      toolLibraryIntro: "常用文档任务已整理成独立工具页。",
      viewCompression: "查看压缩工具",
      featureOneTitle: "下载更明显",
      featureOneText: "每个工作台都有结果面板，处理完成后还会出现固定下载浮层。",
      featureTwoTitle: "独立页面",
      featureTwoText: "转换、压缩、整理和安全工具都拥有自己的 URL 与流程。",
      featureThreeTitle: "能力边界清晰",
      featureThreeText: "浏览器可执行的工具直接运行，依赖引擎的安全操作会明确提示。",
      footerHome: "文件仅用于当前处理流程，结果生成后可直接下载。",
      workspaceGhost: "首页",
      convertCta: "压缩文件",
      compressCta: "整理 PDF",
      mergeCta: "安全工具",
      securityCta: "转换工具",
      convertRail: "转换工具",
      compressRail: "压缩工具",
      mergeRail: "PDF 工具",
      securityRail: "安全工具",
      tool: "工具",
      uploadStart: "上传文件并开始处理。",
      defaultMessage: "选择工具并上传文件，完成后即可下载。",
      securityMessage: "安全工具需要接入支持密码的 PDF 引擎。",
      uploadFiles: "上传文件",
      supportedFormats: "支持格式会随当前工具变化。",
      browseFiles: "浏览文件",
      filesToProcess: "待处理文件",
      zeroFiles: "0 个文件",
      preview: "预览",
      noFile: "未选择文件",
      previewArea: "预览区域",
      previewEmpty: "选择队列中的文件后会在这里预览。",
      settings: "设置",
      start: "开始处理",
      clear: "清空工作台",
      notes: "工具说明会显示在这里。",
      downloads: "下载结果",
      downloadText: "处理后的文件会通过浏览器保存。",
      securityDownloadText: "接入生产引擎后，安全处理结果会显示在这里。",
      downloadAll: "全部下载",
      downloadLatest: "下载最新文件",
      footerConvert: "转换完成后会立即显示下载按钮。",
      footerCompress: "压缩前后的大小会显示在结果说明中。",
      footerMerge: "队列顺序会影响合并后的 PDF 顺序。",
      footerSecurity: "安全操作应使用可靠的加密引擎。",
      estimatedSize: "预计大小：",
      outputSize: "压缩后大小：",
      totalSaving: "总节省：",
      compressNow: "立即压缩"
    }
  };

  const state = {
    page: document.body.dataset.page || "tools",
    activeTool: null,
    queue: [],
    results: [],
    selectedId: null,
    busy: false,
    compressionPrediction: {
      key: "",
      status: "idle",
      inputBytes: 0,
      estimatedBytes: 0,
      outputs: []
    },
    compressionPredictionTimer: null,
    compressionPredictionRun: 0
  };

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));

  if (window.pdfjsLib) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  }

  function init() {
    document.body.classList.remove("app-ready");
    try {
      bindLanguageToggle();
      applyStaticCopy();
      markActiveNav();
      ensureDownloadDock();
      renderHomeTools();
      initWorkspace();
    } finally {
      requestAnimationFrame(() => {
        document.body.classList.add("app-ready");
      });
    }
  }

  function text(key) {
    return staticCopy[currentLang][key] || staticCopy.en[key] || key;
  }

  function bindLanguageToggle() {
    const button = $("#languageToggle");
    if (!button) return;
    button.addEventListener("click", () => {
      currentLang = currentLang === "en" ? "zh" : "en";
      localStorage.setItem("filestream-language", currentLang);
      applyToolCopy(currentLang);
      applyStaticCopy();
      if ($("#workspaceApp")) {
        const keys = pageTools[state.page] || pageTools.convert;
        renderRail(keys);
        renderAll();
      } else {
        renderHomeTools();
      }
    });
  }

  function setText(selector, value) {
    const node = $(selector);
    if (node) node.textContent = value;
  }

  function applyStaticCopy() {
    document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
    setText('.nav a[href="index.html"]', text("navTools"));
    setText('.nav a[href="compress.html"]', text("navCompress"));
    setText('.nav a[href="convert.html"]', text("navConvert"));
    setText('.nav a[href="merge.html"]', text("navOrganize"));
    setText('.nav a[href="security.html"]', text("navSecurity"));
    setText("#languageToggle", text("langToggle"));

    if (state.page === "tools") {
      setText(".account-actions .ghost-link", text("homeGhost"));
      setText(".account-actions .btn-primary", text("homePrimary"));
      setText(".hero .eyebrow", text("homeEyebrow"));
      setText(".hero h1", text("homeTitle"));
      setText(".hero p", text("homeIntro"));
      setText('.hero-actions .btn-primary', text("homeSelect"));
      setText('.hero-actions .btn-secondary', text("homeBrowse"));
      setText(".trust-row span:nth-child(1)", text("trustOne"));
      setText(".trust-row span:nth-child(2)", text("trustTwo"));
      setText(".trust-row span:nth-child(3)", text("trustThree"));
      setText(".product-brief .eyebrow", text("briefEyebrow"));
      setText(".product-brief h2", text("briefTitle"));
      setText(".product-brief p", text("briefIntro"));
      setText(".brief-metrics div:nth-child(1) span", text("briefMetricOne"));
      setText(".brief-metrics div:nth-child(2) span", text("briefMetricTwo"));
      setText(".brief-metrics div:nth-child(3) span", text("briefMetricThree"));
      setText(".brief-flow span:nth-child(1)", text("briefFlowOne"));
      setText(".brief-flow span:nth-child(2)", text("briefFlowTwo"));
      setText(".brief-flow span:nth-child(3)", text("briefFlowThree"));
      setText(".section-head h2", text("toolLibrary"));
      setText(".section-head p", text("toolLibraryIntro"));
      setText(".section-head .btn", text("viewCompression"));
      setText(".feature-card:nth-child(1) h3", text("featureOneTitle"));
      setText(".feature-card:nth-child(1) p", text("featureOneText"));
      setText(".feature-card:nth-child(2) h3", text("featureTwoTitle"));
      setText(".feature-card:nth-child(2) p", text("featureTwoText"));
      setText(".feature-card:nth-child(3) h3", text("featureThreeTitle"));
      setText(".feature-card:nth-child(3) p", text("featureThreeText"));
      setText(".footer span", text("footerHome"));
      return;
    }

    setText(".account-actions .ghost-link", text("workspaceGhost"));
    if ($("#pageTitle")) $("#pageTitle").textContent = pageMeta[currentLang][state.page].title;
    if ($("#pageIntro")) $("#pageIntro").textContent = pageMeta[currentLang][state.page].intro;
    const ctaByPage = { convert: "convertCta", compress: "compressCta", merge: "mergeCta", security: "securityCta" };
    setText(".account-actions .btn-primary", text(ctaByPage[state.page]));
    const railByPage = { convert: "convertRail", compress: "compressRail", merge: "mergeRail", security: "securityRail" };
    setText(".rail-title", text(railByPage[state.page]));
    setText("#toolTitle", text("tool"));
    setText("#toolDescription", text("uploadStart"));
    setText("#messageBox", state.page === "security" ? text("securityMessage") : text("defaultMessage"));
    setText("#dropTitle", text("uploadFiles"));
    setText("#dropDescription", text("supportedFormats"));
    setText("#pickFilesButton", text("browseFiles"));
    setText("#queueMeta", text("zeroFiles"));
    setText("#queueTitle", text("filesToProcess"));
    $$(".rail-title").forEach((node, index) => {
      if (index === 1) node.textContent = text("settings");
    });
    setText("#startButton", text("start"));
    setText("#clearButton", text("clear"));
    setText("#tipBox", text("notes"));
    $$("aside .workspace-title h2").forEach((node) => {
      if (node.textContent === "Downloads" || node.textContent === "下载结果") node.textContent = text("downloads");
    });
    $$("aside .workspace-title p").forEach((node) => {
      if (node.textContent.includes("Processed") || node.textContent.includes("Security") || node.textContent.includes("处理") || node.textContent.includes("安全")) {
        node.textContent = state.page === "security" ? text("securityDownloadText") : text("downloadText");
      }
    });
    setText("#downloadAllButton", text("downloadAll"));
    setText("#downloadLatestButton", text("downloadLatest"));
    const footerByPage = { convert: "footerConvert", compress: "footerCompress", merge: "footerMerge", security: "footerSecurity" };
    setText(".footer span", text(footerByPage[state.page]));
    setText("#estimatedSizeLabel", text("estimatedSize"));
    setText("#totalSavingLabel", text("totalSaving"));
    if (state.page === "compress") setText("#startButton", text("compressNow"));
  }

  function ensureDownloadDock() {
    if (!$("#workspaceApp") || $("#downloadDock")) return;
    const dock = document.createElement("div");
    dock.id = "downloadDock";
    dock.className = "download-dock";
    dock.innerHTML = `
      <strong id="dockFileName">Your file is ready</strong>
      <p id="dockFileMeta">Download the processed output now.</p>
      <div class="download-dock-actions">
        <button id="dockDownloadLatest" type="button" class="btn btn-primary">
          <span class="material-symbols-outlined">download</span>
          Download latest file
        </button>
        <button id="dockDownloadAll" type="button" class="btn btn-secondary">All</button>
      </div>
    `;
    document.body.appendChild(dock);
    $("#dockDownloadLatest").addEventListener("click", () => {
      if (state.results[0]) triggerDownload(state.results[0].url, state.results[0].name);
    });
    $("#dockDownloadAll").addEventListener("click", downloadAll);
  }

  function markActiveNav() {
    $$(".nav a").forEach((link) => {
      const href = link.getAttribute("href") || "";
      const page = href.replace(".html", "").replace("index", "tools");
      link.classList.toggle("is-active", page === state.page);
    });
  }

  function renderHomeTools() {
    const grid = $("#toolGrid");
    if (!grid) return;
    grid.innerHTML = "";
    Object.entries(tools).forEach(([key, tool]) => grid.appendChild(createToolCard(key, tool)));
  }

  function createToolCard(key, tool) {
    const card = document.createElement("a");
    card.className = "tool-card";
    card.href = `${tool.page}.html?tool=${encodeURIComponent(key)}`;
    card.innerHTML = `
      <div class="tool-card-top">
        <div class="tool-icon"><span class="material-symbols-outlined">${tool.icon}</span></div>
        <span class="chip">${tool.group}</span>
      </div>
      <div>
        <h3>${tool.label}</h3>
        <p>${tool.description}</p>
      </div>
      <div class="chip-row">${tool.badges.slice(0, 3).map((badge) => `<span class="chip">${badge}</span>`).join("")}</div>
    `;
    return card;
  }

  function initWorkspace() {
    if (!$("#workspaceApp")) return;
    const keys = pageTools[state.page] || pageTools.convert;
    const requested = new URLSearchParams(location.search).get("tool");
    state.activeTool = keys.includes(requested) ? requested : keys[0];
    $("#pageTitle").textContent = pageMeta[currentLang][state.page].title;
    $("#pageIntro").textContent = pageMeta[currentLang][state.page].intro;
    renderRail(keys);
    bindWorkspaceEvents();
    renderAll();
  }

  function renderRail(keys) {
    const rail = $("#toolRail");
    rail.innerHTML = "";
    keys.forEach((key) => {
      const tool = tools[key];
      const button = document.createElement("button");
      button.type = "button";
      button.className = "rail-button";
      button.dataset.tool = key;
      button.innerHTML = `<span class="material-symbols-outlined">${tool.icon}</span><span>${tool.label}</span>`;
      button.addEventListener("click", () => {
        history.pushState(null, "", `${state.page}.html?tool=${encodeURIComponent(key)}`);
        resetWorkspace(key);
      });
      rail.appendChild(button);
    });
  }

  function resetWorkspace(key) {
    revokeResults();
    state.activeTool = key;
    state.queue = [];
    state.results = [];
    state.selectedId = null;
    state.busy = false;
    invalidateCompressionPrediction();
    $("#fileInput").value = "";
    setMessage(currentLang === "zh" ? `已切换到「${tools[key].label}」，请上传对应文件。` : `Switched to ${tools[key].label}. Upload compatible files to continue.`);
    renderAll();
  }

  function renderAll() {
    renderToolDetails();
    renderQueue();
    renderPreview();
    renderParams();
    renderResults();
    updateButtons();
    scheduleCompressionPrediction();
  }

  function renderToolDetails() {
    const tool = tools[state.activeTool];
    $$(".rail-button").forEach((button) => button.classList.toggle("is-active", button.dataset.tool === state.activeTool));
    $("#toolTitle").textContent = tool.label;
    $("#toolDescription").textContent = tool.description;
    $("#statusPill").textContent = tool.group;
    $("#dropTitle").textContent = currentLang === "zh" ? `上传文件用于${tool.label}` : `Drop files for ${tool.label}`;
    $("#dropDescription").textContent = tool.description;
    $("#fileInput").accept = tool.accept;
    $("#fileInput").multiple = tool.multiple;
    $("#tipBox").textContent = tool.tip;
    $("#toolBadges").innerHTML = tool.badges.map((badge) => `<span class="chip">${badge}</span>`).join("");
    $("#dropHelp").innerHTML = tool.help.map((item) => `<span class="chip">${item}</span>`).join("");
  }

  function renderParams() {
    const holder = $("#paramList");
    holder.innerHTML = "";
    tools[state.activeTool].params.forEach((param) => {
      const field = document.createElement("div");
      field.className = "field";
      if (param.type === "select") {
        const initial = param.value || param.options[0];
        field.innerHTML = `
          <label>${param.label}</label>
          <input id="param-${param.id}" data-param="${param.id}" type="hidden" value="${initial}">
          <div class="choice-grid">
            ${param.options.map((option) => `<button class="choice-button ${option === initial ? "is-active" : ""}" type="button" data-value="${option}">${option}</button>`).join("")}
          </div>
        `;
        field.querySelectorAll(".choice-button").forEach((button) => {
          button.addEventListener("click", () => {
            field.querySelector("input").value = button.dataset.value;
            field.querySelectorAll(".choice-button").forEach((item) => item.classList.toggle("is-active", item === button));
            invalidateCompressionPrediction();
            scheduleCompressionPrediction();
          });
        });
      } else if (param.type === "range") {
        field.innerHTML = `<label for="param-${param.id}">${param.label}: <span data-range-label="${param.id}">${param.value}</span></label><input id="param-${param.id}" data-param="${param.id}" type="range" min="${param.min}" max="${param.max}" step="${param.step}" value="${param.value}">`;
      } else {
        field.innerHTML = `<label for="param-${param.id}">${param.label}</label><input id="param-${param.id}" data-param="${param.id}" type="${param.type || "text"}" value="${param.value || ""}" placeholder="${param.placeholder || ""}">`;
      }
      holder.appendChild(field);
    });
    holder.querySelectorAll('input[type="range"]').forEach((input) => {
      input.addEventListener("input", () => {
        const label = holder.querySelector(`[data-range-label="${input.dataset.param}"]`);
        if (label) label.textContent = input.value;
        invalidateCompressionPrediction();
        scheduleCompressionPrediction();
      });
    });
  }

  function bindWorkspaceEvents() {
    const fileInput = $("#fileInput");
    const dropzone = $("#dropzone");
    $("#pickFilesButton").addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", (event) => {
      addFiles(event.target.files);
      event.target.value = "";
    });
    ["dragenter", "dragover"].forEach((name) => {
      dropzone.addEventListener(name, (event) => {
        event.preventDefault();
        dropzone.classList.add("is-dragging");
      });
    });
    ["dragleave", "drop"].forEach((name) => {
      dropzone.addEventListener(name, (event) => {
        event.preventDefault();
        dropzone.classList.remove("is-dragging");
      });
    });
    dropzone.addEventListener("drop", (event) => addFiles(event.dataTransfer.files));
    dropzone.addEventListener("click", (event) => {
      if (event.target.closest("button")) return;
      fileInput.click();
    });
    $("#startButton").addEventListener("click", processQueue);
    $("#clearButton").addEventListener("click", clearQueue);
    $("#downloadAllButton").addEventListener("click", downloadAll);
    $("#downloadLatestButton").addEventListener("click", () => {
      if (state.results[0]) triggerDownload(state.results[0].url, state.results[0].name);
    });
  }

  function bindHeroUpload() {
    const hero = $("#heroUpload");
    if (!hero) return;
    hero.addEventListener("click", () => {
      location.href = "convert.html?tool=imageToPdf";
    });
  }

  function addFiles(fileList) {
    const tool = tools[state.activeTool];
    const incoming = Array.from(fileList || []);
    const accepted = [];
    const allowed = tool.accept.split(",").map((ext) => ext.trim().toLowerCase());
    for (const file of incoming) {
      const ext = "." + file.name.split(".").pop().toLowerCase();
      const maxSize = file.type.startsWith("image/") ? 20 * 1024 * 1024 : 100 * 1024 * 1024;
      if (!allowed.includes(ext)) {
        setMessage(currentLang === "zh" ? `${file.name} 格式不支持。当前工具支持：${tool.accept}` : `${file.name} is not supported. This tool accepts ${tool.accept}.`, true);
        continue;
      }
      if (file.size > maxSize) {
        setMessage(currentLang === "zh" ? `${file.name} 超出大小限制。` : `${file.name} exceeds the file size limit.`, true);
        continue;
      }
      accepted.push({
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        file,
        status: "ready",
        progress: 0
      });
    }
    if (!tool.multiple && accepted.length + state.queue.length > 1) {
      state.queue = accepted.slice(0, 1);
    } else {
      state.queue.push(...accepted);
    }
    if (!state.selectedId && state.queue[0]) state.selectedId = state.queue[0].id;
    if (accepted.length) {
      revokeResults();
      state.results = [];
      invalidateCompressionPrediction();
      setMessage(currentLang === "zh" ? `已添加 ${accepted.length} 个文件，可以开始处理。` : `${accepted.length} file(s) added. Ready to process.`);
    }
    renderAll();
  }

  function renderQueue() {
    const list = $("#queueList");
    const meta = $("#queueMeta");
    const total = state.queue.reduce((sum, item) => sum + item.file.size, 0);
    meta.textContent = currentLang === "zh" ? `${state.queue.length} 个文件 · ${formatBytes(total)} · ${state.busy ? "处理中" : "待处理"}` : `${state.queue.length} file(s) · ${formatBytes(total)} · ${state.busy ? "Processing" : "Ready"}`;
    updateCompressionStats();
    if (!state.queue.length) {
      list.innerHTML = `<div class="file-row"><div class="file-main"><div class="file-name">${currentLang === "zh" ? "还没有文件" : "No files yet"}</div><div class="file-meta">${currentLang === "zh" ? "上传后的文件会出现在这里，可调整顺序或移除。" : "Uploaded files will appear here for ordering and removal."}</div></div></div>`;
      return;
    }
    list.innerHTML = "";
    state.queue.forEach((item, index) => {
      const row = document.createElement("div");
      row.className = `file-row ${state.selectedId === item.id ? "is-selected" : ""}`;
      row.innerHTML = `
        <div class="tool-icon"><span class="material-symbols-outlined">draft</span></div>
        <div class="file-main">
          <div class="file-name">${index + 1}. ${item.file.name}</div>
          <div class="file-meta">${formatBytes(item.file.size)} · ${item.status}</div>
        </div>
        <button class="icon-button" type="button" data-action="up" title="${currentLang === "zh" ? "上移" : "Move up"}"><span class="material-symbols-outlined">arrow_upward</span></button>
        <button class="icon-button" type="button" data-action="down" title="${currentLang === "zh" ? "下移" : "Move down"}"><span class="material-symbols-outlined">arrow_downward</span></button>
        <button class="icon-button" type="button" data-action="remove" title="${currentLang === "zh" ? "移除" : "Remove"}"><span class="material-symbols-outlined">close</span></button>
      `;
      row.addEventListener("click", (event) => {
        const action = event.target.closest("button")?.dataset.action;
        if (action) {
          event.stopPropagation();
          mutateQueue(action, item.id);
          return;
        }
        state.selectedId = item.id;
        renderQueue();
        renderPreview();
      });
      list.appendChild(row);
    });
  }

  function mutateQueue(action, id) {
    const index = state.queue.findIndex((item) => item.id === id);
    if (index < 0) return;
    if (action === "remove") state.queue.splice(index, 1);
    if (action === "up" && index > 0) [state.queue[index - 1], state.queue[index]] = [state.queue[index], state.queue[index - 1]];
    if (action === "down" && index < state.queue.length - 1) [state.queue[index + 1], state.queue[index]] = [state.queue[index], state.queue[index + 1]];
    if (!state.queue.some((item) => item.id === state.selectedId)) state.selectedId = state.queue[0]?.id || null;
    invalidateCompressionPrediction();
    renderAll();
  }

  async function renderPreview() {
    const preview = $("#previewBody");
    if (!preview) return;
    const selected = state.queue.find((item) => item.id === state.selectedId);
    if (!selected) {
      preview.textContent = "Select a queued file to preview it here.";
      return;
    }
    $("#previewName").textContent = selected.file.name;
    $("#previewMeta").textContent = formatBytes(selected.file.size);
    if (selected.file.type.startsWith("image/")) {
      preview.innerHTML = `<img alt="preview" src="${URL.createObjectURL(selected.file)}">`;
      return;
    }
    if (selected.file.type === "application/pdf" || selected.file.name.toLowerCase().endsWith(".pdf")) {
      try {
        const pdf = await pdfjsLib.getDocument({ data: await selected.file.arrayBuffer() }).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 0.8 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
        preview.innerHTML = "";
        preview.appendChild(canvas);
        return;
      } catch (error) {
        preview.textContent = "This PDF cannot be previewed. It may be encrypted or damaged.";
        return;
      }
    }
    preview.innerHTML = `<div><span class="material-symbols-outlined" style="font-size:54px;color:var(--primary)">draft</span><p>${selected.file.name}</p><p>${formatBytes(selected.file.size)}</p></div>`;
  }

  function renderResults() {
    const list = $("#resultList");
    const summary = $("#downloadSummary");
    const latest = state.results[0];
    $("#downloadAllButton").disabled = !state.results.length || state.busy;
    $("#downloadLatestButton").disabled = !latest || state.busy;
    summary.classList.toggle("is-visible", Boolean(latest));
    if (latest) {
      $("#summaryName").textContent = latest.name;
      $("#summaryMeta").textContent = `${formatBytes(latest.blob.size)} · ${latest.note || (currentLang === "zh" ? "可下载" : "Ready to download")}`;
    }
    if (!state.results.length) {
      list.innerHTML = `<div class="result-row"><div class="result-main"><div class="result-name">${currentLang === "zh" ? "暂无结果" : "No output yet"}</div><div class="result-meta">${currentLang === "zh" ? "处理完成后，下载按钮会显示在这里。" : "Processed files will appear here with direct browser download buttons."}</div></div></div>`;
      updateCompressionStats();
      updateDownloadDock();
      return;
    }
    list.innerHTML = "";
    state.results.forEach((result) => {
      const row = document.createElement("div");
      row.className = "result-row";
      row.innerHTML = `
        <div class="tool-icon"><span class="material-symbols-outlined">download_done</span></div>
        <div class="result-main">
          <div class="result-name">${result.name}</div>
          <div class="result-meta">${formatBytes(result.blob.size)} · ${result.note || (currentLang === "zh" ? "已完成" : "Done")}</div>
        </div>
        <button class="btn btn-secondary" type="button">${currentLang === "zh" ? "下载" : "Download"}</button>
      `;
      row.querySelector("button").addEventListener("click", () => triggerDownload(result.url, result.name));
      list.appendChild(row);
    });
    updateCompressionStats();
    updateDownloadDock();
  }

  function updateCompressionStats() {
    if (state.page !== "compress" || !$("#sizeComparePanel")) return;
    const before = state.queue.reduce((sum, item) => sum + item.file.size, 0);
    const after = state.results.reduce((sum, result) => sum + result.blob.size, 0);
    const hasActualOutput = state.results.length > 0;
    const displayedSize = hasActualOutput ? after : estimateCompressedSize(before);
    const savedBytes = Math.max(0, before - displayedSize);
    const sizeValue = $("#estimatedSizeValue");
    const savingValue = $("#totalSavingValue");
    setText("#estimatedSizeLabel", hasActualOutput ? text("outputSize") : text("estimatedSize"));
    $(".estimate-mark").textContent = hasActualOutput ? "" : "~";
    sizeValue.textContent = before ? formatBytesPrecise(displayedSize) : "0 B";
    savingValue.textContent = before ? formatBytesPrecise(savedBytes) : "0 B";
    sizeValue.title = before ? `${displayedSize.toLocaleString()} bytes` : "0 bytes";
    savingValue.title = before ? `${savedBytes.toLocaleString()} bytes` : "0 bytes";
    $("#totalSavingPrefix").textContent = "-";
  }

  function estimateCompressedSize(bytes) {
    if (!bytes) return 0;
    const tool = tools[state.activeTool];
    const params = getParams();
    if (tool?.mode === "imageCompress") {
      const quality = Number(params.quality || 76) / 100;
      return Math.max(1, Math.round(bytes * Math.min(0.92, Math.max(0.28, quality * 0.78))));
    }
    if (tool?.mode === "docCompress") {
      const factor = params.level === "Strong" || params.level === "强力" ? 0.62 : params.level === "Balanced" || params.level === "均衡" ? 0.74 : 0.84;
      return Math.max(1, Math.round(bytes * factor));
    }
    const factor = params.level === "High" || params.level === "高压缩" ? 0.48 : params.level === "Medium" || params.level === "中压缩" ? 0.62 : 0.78;
    return Math.max(1, Math.round(bytes * factor));
  }

  function updateCompressionStats() {
    if (state.page !== "compress" || !$("#sizeComparePanel")) return;
    const before = state.queue.reduce((sum, item) => sum + item.file.size, 0);
    const prediction = state.compressionPrediction;
    const sizeValue = $("#estimatedSizeValue");
    const savingValue = $("#totalSavingValue");
    setText("#estimatedSizeLabel", text("estimatedSize"));
    $(".estimate-mark").textContent = before ? "~" : "~";
    if (prediction.status === "loading") {
      sizeValue.textContent = currentLang === "zh" ? "检测中..." : "Detecting...";
      savingValue.textContent = currentLang === "zh" ? "检测中..." : "Detecting...";
      sizeValue.title = "";
      savingValue.title = "";
      $("#totalSavingPrefix").textContent = "-";
      return;
    }
    const hasPrediction = prediction.status === "ready" && prediction.estimatedBytes > 0;
    const displayedSize = hasPrediction ? prediction.estimatedBytes : 0;
    const savedBytes = hasPrediction ? Math.max(0, before - displayedSize) : 0;
    sizeValue.textContent = hasPrediction ? formatBytesPrecise(displayedSize) : "0 B";
    savingValue.textContent = hasPrediction ? formatBytesPrecise(savedBytes) : "0 B";
    sizeValue.title = hasPrediction ? `${displayedSize.toLocaleString()} bytes` : "0 bytes";
    savingValue.title = hasPrediction ? `${savedBytes.toLocaleString()} bytes` : "0 bytes";
    $("#totalSavingPrefix").textContent = "-";
  }

  function invalidateCompressionPrediction() {
    clearTimeout(state.compressionPredictionTimer);
    state.compressionPredictionRun += 1;
    state.compressionPrediction = {
      key: "",
      status: "idle",
      inputBytes: 0,
      estimatedBytes: 0,
      outputs: []
    };
  }

  function scheduleCompressionPrediction() {
    if (state.page !== "compress" || !$("#sizeComparePanel")) return;
    const tool = tools[state.activeTool];
    if (!isCompressionMode(tool?.mode)) return;
    if (!state.queue.length) {
      invalidateCompressionPrediction();
      updateCompressionStats();
      return;
    }
    const key = getCompressionPredictionKey();
    if (state.compressionPrediction.key === key && ["loading", "ready"].includes(state.compressionPrediction.status)) {
      updateCompressionStats();
      return;
    }
    clearTimeout(state.compressionPredictionTimer);
    const runId = state.compressionPredictionRun + 1;
    state.compressionPredictionRun = runId;
    state.compressionPrediction = {
      key,
      status: "loading",
      inputBytes: state.queue.reduce((sum, item) => sum + item.file.size, 0),
      estimatedBytes: 0,
      outputs: []
    };
    updateCompressionStats();
    updateButtons();
    state.compressionPredictionTimer = setTimeout(async () => {
      try {
        const files = state.queue.map((item) => item.file);
        const params = getParams();
        const outputs = await buildCompressionPrediction(files, params, tool);
        if (runId !== state.compressionPredictionRun || key !== getCompressionPredictionKey()) return;
        const estimatedBytes = outputs.reduce((sum, item) => sum + item.blob.size, 0);
        state.compressionPrediction = {
          key,
          status: "ready",
          inputBytes: state.queue.reduce((sum, item) => sum + item.file.size, 0),
          estimatedBytes,
          outputs
        };
        updateCompressionStats();
        updateButtons();
      } catch (error) {
        if (runId !== state.compressionPredictionRun) return;
        state.compressionPrediction = {
          key,
          status: "error",
          inputBytes: state.queue.reduce((sum, item) => sum + item.file.size, 0),
          estimatedBytes: 0,
          outputs: []
        };
        updateCompressionStats();
        updateButtons();
      }
    }, 250);
  }

  function isCompressionMode(mode) {
    return ["pdfCompress", "imageCompress", "docCompress"].includes(mode);
  }

  function getCompressionPredictionKey() {
    const files = state.queue.map((item) => ({
      name: item.file.name,
      size: item.file.size,
      modified: item.file.lastModified
    }));
    return JSON.stringify({ tool: state.activeTool, files, params: getParams() });
  }

  async function buildCompressionPrediction(files, params, tool) {
    if (tool.mode === "pdfCompress") {
      const blob = await compressPdf(files[0], params);
      return [{ blob, name: withExt(params.outputName || "compressed_pdf", "pdf"), note: blob._note || "" }];
    }
    if (tool.mode === "imageCompress") return compressImagesBlobs(files, params);
    if (tool.mode === "docCompress") return compressOfficeDocBlobs(files, params);
    return [];
  }

  async function useCompressionPredictionIfReady() {
    const tool = tools[state.activeTool];
    if (state.page !== "compress" || !isCompressionMode(tool?.mode)) return null;
    const key = getCompressionPredictionKey();
    if (state.compressionPrediction.status !== "ready" || state.compressionPrediction.key !== key) return null;
    return Promise.all(state.compressionPrediction.outputs.map((item) => resultFromBlob(item.blob, item.name, item.note)));
  }

  function updateDownloadDock() {
    const dock = $("#downloadDock");
    if (!dock) return;
    const latest = state.results[0];
    dock.classList.toggle("is-visible", Boolean(latest));
    if (!latest) return;
    $("#dockFileName").textContent = latest.name;
    $("#dockFileMeta").textContent = currentLang === "zh" ? `${formatBytes(latest.blob.size)} · ${state.results.length} 个结果可下载` : `${formatBytes(latest.blob.size)} · ${state.results.length} output file(s) ready`;
  }

  function updateButtons() {
    const waitingForCompressionCheck = state.page === "compress" && state.compressionPrediction.status === "loading";
    $("#startButton").disabled = !state.queue.length || state.busy || waitingForCompressionCheck;
    $("#clearButton").disabled = !state.queue.length || state.busy;
  }

  function getParams() {
    const values = {};
    $$("[data-param]").forEach((input) => {
      values[input.dataset.param] = input.value;
    });
    return values;
  }

  async function processQueue() {
    if (!state.queue.length || state.busy) return;
    state.busy = true;
    revokeResults();
    state.results = [];
    renderResults();
    updateButtons();
    try {
      const tool = tools[state.activeTool];
      setMessage(currentLang === "zh" ? `正在处理「${tool.label}」...` : `Processing ${tool.label}...`);
      const params = getParams();
      const results = await processActiveTool(tool, params);
      state.results = results;
      setMessage(currentLang === "zh" ? `处理完成，已生成 ${results.length} 个可下载文件。可使用右下角下载按钮保存。` : `Done. ${results.length} downloadable file(s) are ready. Use the floating Download button at the bottom-right.`);
    } catch (error) {
      setMessage(error.message || (currentLang === "zh" ? "处理失败，请检查文件后重试。" : "Processing failed. Please check the file and try again."), true);
    } finally {
      state.busy = false;
      renderResults();
      updateButtons();
    }
  }

  async function processActiveTool(tool, params) {
    const files = state.queue.map((item) => item.file);
    const predictedCompressionResults = await useCompressionPredictionIfReady();
    if (predictedCompressionResults) return predictedCompressionResults;
    switch (tool.mode) {
      case "imageToPdf": return [await resultFromBlob(await imageToPdf(files, params), withExt(params.outputName || "images_to_pdf", "pdf"), currentLang === "zh" ? "图片已合成为 PDF" : "Images merged into PDF")];
      case "pdfToImage": return pdfToImages(files[0], params);
      case "pdfMerge": return [await resultFromBlob(await mergePdfAndImages(files), withExt(params.outputName || "merged_document", "pdf"), currentLang === "zh" ? "文件已合并" : "Files merged")];
      case "pdfDelete": return [await resultFromBlob(await deletePdfPages(files[0], params.pages), withExt(params.outputName || "deleted_pages", "pdf"), currentLang === "zh" ? "页面已删除" : "Pages removed")];
      case "pdfSplit": return [await resultFromBlob(await splitPdf(files[0], params), withExt(params.outputName || "split_pdf", "zip"), currentLang === "zh" ? "拆分结果已打包" : "Split output ZIP")];
      case "pdfSort": return [await resultFromBlob(await sortPdfPages(files[0], params.order), withExt(params.outputName || "sorted_pdf", "pdf"), currentLang === "zh" ? "页面已重新排序" : "Pages reordered")];
      case "pdfRotate": return [await resultFromBlob(await rotatePdfPages(files[0], params), withExt(params.outputName || "rotated_pdf", "pdf"), currentLang === "zh" ? "页面已旋转" : "Pages rotated")];
      case "pdfCompress": return [await resultFromBlob(await compressPdf(files[0], params), withExt(params.outputName || "compressed_pdf", "pdf"), currentLang === "zh" ? "PDF 已压缩" : "PDF compressed")];
      case "imageCompress": return compressImages(files, params);
      case "docCompress": return compressOfficeDocs(files, params);
      case "wordToPdf": return officeTextToPdfBatch(files, params, "word");
      case "pptToPdf": return officeTextToPdfBatch(files, params, "ppt");
      case "excelToPdf": return officeTextToPdfBatch(files, params, "excel");
      case "pdfToWord": return pdfToWordDocs(files, params);
      case "pdfToExcel": return pdfToCsvFiles(files, params);
      case "pdfToPpt": return pdfToPptFiles(files, params);
      case "protectPdf":
      case "unlockPdf":
        throw new Error(currentLang === "zh" ? "PDF 加密和解密需要支持密码的安全引擎，纯前端无法可靠完成。" : "PDF protection and unlocking require a password-aware PDF security engine. The workspace is ready, but pure front-end code cannot reliably perform this operation.");
      default:
        throw new Error(currentLang === "zh" ? "该工具暂未接入处理能力。" : "This tool does not have a processor yet.");
    }
  }

  async function imageToPdf(files, params) {
    const pdf = await PDFLib.PDFDocument.create();
    const margin = Number(params.margin || 0);
    for (const file of files) {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const ext = file.name.split(".").pop().toLowerCase();
      const img = ext === "png" ? await pdf.embedPng(bytes) : await pdf.embedJpg(await imageFileToJpegBytes(file, 0.92));
      const size = pageSizeForImage(img, params);
      const page = pdf.addPage(size);
      const pageWidth = page.getWidth() - margin * 2;
      const pageHeight = page.getHeight() - margin * 2;
      const scale = Math.min(pageWidth / img.width, pageHeight / img.height);
      const width = img.width * scale;
      const height = img.height * scale;
      page.drawImage(img, { x: (page.getWidth() - width) / 2, y: (page.getHeight() - height) / 2, width, height });
    }
    return blobFromBytes(await pdf.save(), "application/pdf");
  }

  function pageSizeForImage(img, params) {
    if (params.pageSize === "Original size" || params.pageSize === "原图尺寸") return [img.width, img.height];
    const portrait = params.orientation === "Portrait" || params.orientation === "纵向" || ((params.orientation === "Auto" || params.orientation === "自动") && img.height >= img.width);
    const base = params.pageSize === "A3" ? [841.89, 1190.55] : [595.28, 841.89];
    return portrait ? base : [base[1], base[0]];
  }

  async function pdfToImages(file, params) {
    const pdf = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
    const pages = parsePages(params.pages, pdf.numPages, true);
    const scale = (params.scale === "Ultra" || params.scale === "超清") ? 2.4 : (params.scale === "High" || params.scale === "高清") ? 1.8 : 1.25;
    const format = params.format === "JPG" ? "image/jpeg" : "image/png";
    const ext = params.format === "JPG" ? "jpg" : "png";
    const outputs = [];
    for (const pageNum of pages) {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
      const blob = await canvasToBlob(canvas, format, 0.86);
      outputs.push({ blob, name: `${baseName(file.name)}_page_${pageNum}.${ext}` });
    }
    if (outputs.length === 1) return [await resultFromBlob(outputs[0].blob, outputs[0].name, currentLang === "zh" ? "页面已导出为图片" : "Page exported as image")];
    const zip = new JSZip();
    outputs.forEach((item) => zip.file(item.name, item.blob));
    return [await resultFromBlob(await zip.generateAsync({ type: "blob" }), `${baseName(file.name)}_images.zip`, currentLang === "zh" ? "多页图片已打包" : "Multi-page image ZIP")];
  }

  async function mergePdfAndImages(files) {
    const output = await PDFLib.PDFDocument.create();
    for (const file of files) {
      if (file.name.toLowerCase().endsWith(".pdf")) {
        const source = await PDFLib.PDFDocument.load(await file.arrayBuffer());
        const pages = await output.copyPages(source, source.getPageIndices());
        pages.forEach((page) => output.addPage(page));
      } else {
        const imgPdf = await PDFLib.PDFDocument.load(await imageToPdf([file], { pageSize: "Original size", orientation: "Auto", margin: 0 }).then((blob) => blob.arrayBuffer()));
        const [page] = await output.copyPages(imgPdf, [0]);
        output.addPage(page);
      }
    }
    return blobFromBytes(await output.save(), "application/pdf");
  }

  async function deletePdfPages(file, pagesText) {
    const pdf = await PDFLib.PDFDocument.load(await file.arrayBuffer());
    const remove = new Set(parsePages(pagesText, pdf.getPageCount(), false));
    if (!remove.size) throw new Error(currentLang === "zh" ? "请填写要删除的页码。" : "Enter the pages you want to delete.");
    const out = await PDFLib.PDFDocument.create();
    const keep = pdf.getPageIndices().filter((idx) => !remove.has(idx + 1));
    if (!keep.length) throw new Error(currentLang === "zh" ? "不能删除所有页面。" : "You cannot delete every page.");
    const pages = await out.copyPages(pdf, keep);
    pages.forEach((page) => out.addPage(page));
    return blobFromBytes(await out.save(), "application/pdf");
  }

  async function splitPdf(file, params) {
    const pdf = await PDFLib.PDFDocument.load(await file.arrayBuffer());
    const zip = new JSZip();
    const total = pdf.getPageCount();
    let groups = [];
    if (params.splitMode === "Split by page" || params.splitMode === "按页拆分") {
      groups = Array.from({ length: total }, (_, i) => [i + 1]);
    } else if (params.splitMode === "Split every N pages" || params.splitMode === "每 N 页拆分") {
      const n = Math.max(1, Number(params.rule || 1));
      for (let start = 1; start <= total; start += n) groups.push(range(start, Math.min(total, start + n - 1)));
    } else if (params.splitMode === "Extract selected pages" || params.splitMode === "提取指定页面") {
      groups = [parsePages(params.rule, total, false)];
    } else {
      groups = String(params.rule || "").split(",").map((part) => parsePages(part, total, false)).filter(Boolean);
    }
    if (!groups.length || groups.some((group) => !group.length)) throw new Error(currentLang === "zh" ? "请填写有效的拆分规则。" : "Enter a valid split rule.");
    for (let i = 0; i < groups.length; i += 1) {
      const out = await PDFLib.PDFDocument.create();
      const pages = await out.copyPages(pdf, groups[i].map((num) => num - 1));
      pages.forEach((page) => out.addPage(page));
      zip.file(`${baseName(file.name)}_part_${i + 1}.pdf`, await out.save());
    }
    return zip.generateAsync({ type: "blob" });
  }

  async function sortPdfPages(file, orderText) {
    const source = await PDFLib.PDFDocument.load(await file.arrayBuffer());
    const total = source.getPageCount();
    const order = parsePageSequence(orderText, total);
    if (order.length !== total || new Set(order).size !== total) throw new Error(currentLang === "zh" ? `请完整填写 ${total} 个页码，且不要重复。` : `Enter all ${total} page numbers exactly once.`);
    const out = await PDFLib.PDFDocument.create();
    const pages = await out.copyPages(source, order.map((n) => n - 1));
    pages.forEach((page) => out.addPage(page));
    return blobFromBytes(await out.save(), "application/pdf");
  }

  async function rotatePdfPages(file, params) {
    const pdf = await PDFLib.PDFDocument.load(await file.arrayBuffer());
    const pages = params.pages ? parsePages(params.pages, pdf.getPageCount(), false) : range(1, pdf.getPageCount());
    pages.forEach((num) => pdf.getPage(num - 1).setRotation(PDFLib.degrees(Number(params.angle || 90))));
    return blobFromBytes(await pdf.save(), "application/pdf");
  }

  async function compressPdf(file, params) {
    const src = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
    const level = params.level || "Medium";
    const scale = (level === "High" || level === "高压缩") ? 0.9 : (level === "Medium" || level === "中压缩") ? 1.2 : 1.55;
    const quality = (level === "High" || level === "高压缩") ? 0.48 : (level === "Medium" || level === "中压缩") ? 0.62 : 0.78;
    const out = await PDFLib.PDFDocument.create();
    for (let i = 1; i <= src.numPages; i += 1) {
      const page = await src.getPage(i);
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(viewport.width);
      canvas.height = Math.round(viewport.height);
      await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
      const jpg = await canvasToBlob(canvas, "image/jpeg", quality);
      const img = await out.embedJpg(new Uint8Array(await jpg.arrayBuffer()));
      const pdfPage = out.addPage([viewport.width, viewport.height]);
      pdfPage.drawImage(img, { x: 0, y: 0, width: viewport.width, height: viewport.height });
    }
    const blob = blobFromBytes(await out.save({ useObjectStreams: true }), "application/pdf");
    const delta = file.size ? Math.round((1 - blob.size / file.size) * 100) : 0;
    blob._note = currentLang === "zh" ? `原文件 ${formatBytes(file.size)}，压缩后 ${formatBytes(blob.size)}，变化 ${delta}%` : `Before ${formatBytes(file.size)}, after ${formatBytes(blob.size)}, change ${delta}%`;
    return blob;
  }

  async function compressImages(files, params) {
    const results = [];
    const format = params.format === "PNG" ? "image/png" : params.format === "WebP" ? "image/webp" : "image/jpeg";
    const ext = params.format === "PNG" ? "png" : params.format === "WebP" ? "webp" : "jpg";
    const maxWidth = (params.maxWidth === "Keep original width" || params.maxWidth === "保持原宽") ? Infinity : Number(params.maxWidth);
    const quality = Number(params.quality || 76) / 100;
    for (const file of files) {
      const blob = await resizeImage(file, maxWidth, format, quality);
      const change = Math.round((1 - blob.size / file.size) * 100);
      results.push(await resultFromBlob(blob, `${baseName(file.name)}${params.suffix || "_compressed"}.${ext}`, currentLang === "zh" ? `原文件 ${formatBytes(file.size)}，压缩后 ${formatBytes(blob.size)}，变化 ${change}%` : `Before ${formatBytes(file.size)}, after ${formatBytes(blob.size)}, change ${change}%`));
    }
    return results;
  }

  async function compressOfficeDocs(files, params) {
    const results = [];
    const quality = (params.level === "Strong" || params.level === "强力") ? 0.5 : (params.level === "Balanced" || params.level === "均衡") ? 0.64 : 0.78;
    const maxWidth = (params.maxWidth === "Keep original width" || params.maxWidth === "保持原宽") ? Infinity : Number(params.maxWidth);
    for (const file of files) {
      const ext = file.name.split(".").pop().toLowerCase();
      if (!["docx", "pptx"].includes(ext)) throw new Error(currentLang === "zh" ? `${file.name} 是旧版 Office 格式。请上传 .docx 或 .pptx。` : `${file.name} is a legacy Office format. Upload .docx or .pptx for browser-side slimming.`);
      const zip = await JSZip.loadAsync(await file.arrayBuffer());
      const media = Object.values(zip.files).filter((entry) => /\/media\/.+\.(png|jpe?g|webp)$/i.test(entry.name));
      for (const entry of media) {
        const blob = await entry.async("blob");
        if (blob.size < 80 * 1024) continue;
        const slim = await resizeImage(new File([blob], entry.name), maxWidth, "image/jpeg", quality);
        if (slim.size < blob.size) zip.file(entry.name, slim);
      }
      const out = await zip.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } });
      const change = Math.round((1 - out.size / file.size) * 100);
      results.push(await resultFromBlob(out, `${baseName(file.name)}${params.suffix || "_slim"}.${ext}`, currentLang === "zh" ? `原文件 ${formatBytes(file.size)}，压缩后 ${formatBytes(out.size)}，变化 ${change}%` : `Before ${formatBytes(file.size)}, after ${formatBytes(out.size)}, change ${change}%`));
    }
    return results;
  }

  async function compressImages(files, params) {
    const items = await compressImagesBlobs(files, params);
    return Promise.all(items.map((item) => resultFromBlob(item.blob, item.name, item.note)));
  }

  async function compressImagesBlobs(files, params) {
    const results = [];
    const format = params.format === "PNG" ? "image/png" : params.format === "WebP" ? "image/webp" : "image/jpeg";
    const ext = params.format === "PNG" ? "png" : params.format === "WebP" ? "webp" : "jpg";
    const maxWidth = (params.maxWidth === "Keep original width" || params.maxWidth === "保持原宽") ? Infinity : Number(params.maxWidth);
    const quality = Number(params.quality || 76) / 100;
    for (const file of files) {
      const blob = await resizeImage(file, maxWidth, format, quality);
      const change = Math.round((1 - blob.size / file.size) * 100);
      results.push({
        blob,
        name: `${baseName(file.name)}${params.suffix || "_compressed"}.${ext}`,
        note: currentLang === "zh" ? `原文件 ${formatBytes(file.size)}，压缩后 ${formatBytes(blob.size)}，变化 ${change}%` : `Before ${formatBytes(file.size)}, after ${formatBytes(blob.size)}, change ${change}%`
      });
    }
    return results;
  }

  async function compressOfficeDocs(files, params) {
    const items = await compressOfficeDocBlobs(files, params);
    return Promise.all(items.map((item) => resultFromBlob(item.blob, item.name, item.note)));
  }

  async function compressOfficeDocBlobs(files, params) {
    const results = [];
    const quality = (params.level === "Strong" || params.level === "强力") ? 0.5 : (params.level === "Balanced" || params.level === "均衡") ? 0.64 : 0.78;
    const maxWidth = (params.maxWidth === "Keep original width" || params.maxWidth === "保持原宽") ? Infinity : Number(params.maxWidth);
    for (const file of files) {
      const ext = file.name.split(".").pop().toLowerCase();
      if (!["docx", "pptx"].includes(ext)) throw new Error(currentLang === "zh" ? `${file.name} 是旧版 Office 格式。请上传 .docx 或 .pptx。` : `${file.name} is a legacy Office format. Upload .docx or .pptx for browser-side slimming.`);
      const zip = await JSZip.loadAsync(await file.arrayBuffer());
      const media = Object.values(zip.files).filter((entry) => /\/media\/.+\.(png|jpe?g|webp)$/i.test(entry.name));
      for (const entry of media) {
        const blob = await entry.async("blob");
        if (blob.size < 80 * 1024) continue;
        const slim = await resizeImage(new File([blob], entry.name), maxWidth, "image/jpeg", quality);
        if (slim.size < blob.size) zip.file(entry.name, slim);
      }
      const out = await zip.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } });
      const change = Math.round((1 - out.size / file.size) * 100);
      results.push({
        blob: out,
        name: `${baseName(file.name)}${params.suffix || "_slim"}.${ext}`,
        note: currentLang === "zh" ? `原文件 ${formatBytes(file.size)}，压缩后 ${formatBytes(out.size)}，变化 ${change}%` : `Before ${formatBytes(file.size)}, after ${formatBytes(out.size)}, change ${change}%`
      });
    }
    return results;
  }

  async function officeTextToPdfBatch(files, params, kind) {
    const results = [];
    for (const file of files) {
      const text = await extractOfficeText(file, kind);
      const blob = await textToPdf(`${tools[state.activeTool].label} - ${file.name}`, text);
      results.push(await resultFromBlob(blob, `${params.outputName || baseName(file.name)}_${baseName(file.name)}.pdf`, currentLang === "zh" ? "PDF 已生成" : "PDF generated"));
    }
    return results;
  }

  async function pdfToWordDocs(files, params) {
    const results = [];
    for (const file of files) {
      const text = await extractPdfText(file);
      const html = `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(file.name)}</title></head><body><h1>${escapeHtml(file.name)}</h1>${text.split("\n").map((line) => `<p>${escapeHtml(line) || "&nbsp;"}</p>`).join("")}</body></html>`;
      results.push(await resultFromBlob(new Blob([html], { type: "application/msword;charset=utf-8" }), `${params.outputName || "pdf_to_word"}_${baseName(file.name)}.doc`, currentLang === "zh" ? "Word 文档已导出" : "Word-openable document exported"));
    }
    return results;
  }

  async function pdfToCsvFiles(files, params) {
    const results = [];
    for (const file of files) {
      const text = await extractPdfText(file);
      const csv = "\ufeff" + text.split("\n").filter(Boolean).map((line, index) => `"${index + 1}","${line.replaceAll('"', '""')}"`).join("\n");
      results.push(await resultFromBlob(new Blob([csv], { type: "text/csv;charset=utf-8" }), `${params.outputName || "pdf_to_excel"}_${baseName(file.name)}.csv`, currentLang === "zh" ? "CSV 已导出" : "CSV exported"));
    }
    return results;
  }

  async function pdfToPptFiles(files, params) {
    const results = [];
    for (const file of files) {
      const pdf = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
      let html = "<html><head><meta charset='utf-8'><style>body{margin:0;background:#111}.slide{width:1280px;height:720px;display:flex;align-items:center;justify-content:center;page-break-after:always;background:#fff}img{max-width:100%;max-height:100%}</style></head><body>";
      for (let i = 1; i <= pdf.numPages; i += 1) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.35 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
        html += `<div class="slide"><img src="${canvas.toDataURL("image/png")}"></div>`;
      }
      html += "</body></html>";
      results.push(await resultFromBlob(new Blob([html], { type: "application/vnd.ms-powerpoint;charset=utf-8" }), `${params.outputName || "pdf_to_ppt"}_${baseName(file.name)}.ppt`, currentLang === "zh" ? "图片型 PPT 已导出" : "Image-based PowerPoint exported"));
    }
    return results;
  }

  async function extractPdfText(file) {
    const pdf = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
    const lines = [];
    for (let i = 1; i <= pdf.numPages; i += 1) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      lines.push(`Page ${i}`);
      lines.push(content.items.map((item) => item.str).join(" "));
    }
    return lines.join("\n");
  }

  async function extractOfficeText(file, kind) {
    const ext = file.name.split(".").pop().toLowerCase();
    if (ext === "csv") return await file.text();
    if ((kind === "word" && ext !== "docx") || (kind === "ppt" && ext !== "pptx") || (kind === "excel" && ext !== "xlsx")) {
      throw new Error(currentLang === "zh" ? `${file.name} 暂不支持。请上传 .docx、.pptx 或 .xlsx。` : `${file.name} is not supported here. Upload .docx, .pptx, or .xlsx.`);
    }
    const zip = await JSZip.loadAsync(await file.arrayBuffer());
    if (kind === "word") {
      const xml = await zip.file("word/document.xml")?.async("string");
      return xmlText(xml || "");
    }
    if (kind === "ppt") {
      const slides = Object.keys(zip.files).filter((name) => /^ppt\/slides\/slide\d+\.xml$/i.test(name)).sort(naturalSort);
      const out = [];
      for (const slide of slides) out.push(slide.replace(/\D+/g, " ").trim(), xmlText(await zip.file(slide).async("string")));
      return out.join("\n\n");
    }
    return extractXlsxText(zip);
  }

  async function extractXlsxText(zip) {
    const sharedXml = await zip.file("xl/sharedStrings.xml")?.async("string");
    const shared = sharedXml ? nodesByLocalName(new DOMParser().parseFromString(sharedXml, "application/xml"), "t").map((node) => node.textContent || "") : [];
    const sheets = Object.keys(zip.files).filter((name) => /^xl\/worksheets\/sheet\d+\.xml$/i.test(name)).sort(naturalSort);
    const out = [];
    for (const sheet of sheets) {
      const xml = await zip.file(sheet).async("string");
      const doc = new DOMParser().parseFromString(xml, "application/xml");
      out.push(sheet);
      nodesByLocalName(doc, "row").forEach((row) => {
        const values = nodesByLocalName(row, "c").map((cell) => {
          const value = nodesByLocalName(cell, "v")[0]?.textContent || "";
          return cell.getAttribute("t") === "s" ? shared[Number(value)] || "" : value;
        });
        out.push(values.join("    "));
      });
    }
    return out.join("\n");
  }

  async function textToPdf(title, text) {
    const pdf = await PDFLib.PDFDocument.create();
    const font = await pdf.embedFont(PDFLib.StandardFonts.Helvetica);
    let page = pdf.addPage([595.28, 841.89]);
    let y = 790;
    page.drawText(safePdfText(title).slice(0, 80), { x: 48, y, size: 16, font, color: PDFLib.rgb(0, 0.16, 0.55) });
    y -= 34;
    const lines = wrapText(safePdfText(text), 88);
    for (const line of lines) {
      if (y < 54) {
        page = pdf.addPage([595.28, 841.89]);
        y = 790;
      }
      page.drawText(line, { x: 48, y, size: 10, font, lineHeight: 14 });
      y -= 14;
    }
    return blobFromBytes(await pdf.save(), "application/pdf");
  }

  function xmlText(xml) {
    const doc = new DOMParser().parseFromString(xml, "application/xml");
    return nodesByLocalName(doc, "t").map((node) => node.textContent || "").join(" ");
  }

  function nodesByLocalName(root, localName) {
    const namespaceMatches = Array.from(root.getElementsByTagNameNS?.("*", localName) || []);
    if (namespaceMatches.length) return namespaceMatches;
    return Array.from(root.getElementsByTagName("*")).filter((node) => node.localName === localName || node.nodeName === localName);
  }

  function safePdfText(text) {
    return String(text || "").replace(/[^\x09\x0A\x0D\x20-\x7E]/g, "?");
  }

  function wrapText(text, width) {
    const output = [];
    String(text || "").split(/\r?\n/).forEach((paragraph) => {
      let line = "";
      paragraph.split(/\s+/).forEach((word) => {
        if ((line + " " + word).trim().length > width) {
          output.push(line);
          line = word;
        } else {
          line = `${line} ${word}`.trim();
        }
      });
      output.push(line || " ");
    });
    return output;
  }

  async function resizeImage(file, maxWidth, mime, quality) {
    const img = await loadImage(file);
    const scale = Math.min(1, maxWidth / img.width);
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(img.width * scale));
    canvas.height = Math.max(1, Math.round(img.height * scale));
    canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvasToBlob(canvas, mime, quality);
  }

  async function imageFileToJpegBytes(file, quality) {
    const blob = await resizeImage(file, Infinity, "image/jpeg", quality);
    return new Uint8Array(await blob.arrayBuffer());
  }

  function loadImage(file) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve(img);
      };
      img.onerror = reject;
      img.src = url;
    });
  }

  function canvasToBlob(canvas, mime, quality) {
    return new Promise((resolve) => canvas.toBlob(resolve, mime, quality));
  }

  function parsePages(input, total, defaultAll) {
    if (!String(input || "").trim()) return defaultAll ? range(1, total) : [];
    const set = new Set();
    String(input).split(",").forEach((part) => {
      const text = part.trim();
      if (!text) return;
      if (text.includes("-")) {
        const [a, b] = text.split("-").map((n) => Number(n.trim()));
        range(Math.max(1, a), Math.min(total, b)).forEach((n) => set.add(n));
      } else {
        const n = Number(text);
        if (n >= 1 && n <= total) set.add(n);
      }
    });
    return Array.from(set).sort((a, b) => a - b);
  }

  function parsePageSequence(input, total) {
    if (!String(input || "").trim()) return [];
    const output = [];
    String(input).split(",").forEach((part) => {
      const text = part.trim();
      if (!text) return;
      if (text.includes("-")) {
        const [a, b] = text.split("-").map((n) => Number(n.trim()));
        range(Math.max(1, a), Math.min(total, b)).forEach((n) => output.push(n));
      } else {
        const n = Number(text);
        if (n >= 1 && n <= total) output.push(n);
      }
    });
    return output;
  }

  function range(start, end) {
    return Array.from({ length: Math.max(0, end - start + 1) }, (_, i) => start + i);
  }

  function blobFromBytes(bytes, type) {
    return new Blob([bytes], { type });
  }

  async function resultFromBlob(blob, name, note) {
    return { blob, name, note: blob._note || note, url: URL.createObjectURL(blob) };
  }

  function triggerDownload(url, name) {
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  async function downloadAll() {
    if (!state.results.length) return;
    if (state.results.length === 1) {
      triggerDownload(state.results[0].url, state.results[0].name);
      return;
    }
    const zip = new JSZip();
    state.results.forEach((result) => zip.file(result.name, result.blob));
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    triggerDownload(url, `${tools[state.activeTool].label}_results.zip`);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function clearQueue() {
    state.queue = [];
    state.selectedId = null;
    revokeResults();
    state.results = [];
    invalidateCompressionPrediction();
    setMessage(currentLang === "zh" ? "工作台已清空。" : "Workspace cleared.");
    renderAll();
  }

  function revokeResults() {
    state.results.forEach((result) => URL.revokeObjectURL(result.url));
  }

  function setMessage(message, isError) {
    const box = $("#messageBox");
    if (!box) return;
    box.textContent = message;
    box.classList.toggle("is-error", Boolean(isError));
  }

  function withExt(name, ext) {
    const clean = String(name || "output").trim().replace(/[\\/:*?"<>|]+/g, "_") || "output";
    return clean.toLowerCase().endsWith(`.${ext}`) ? clean : `${clean}.${ext}`;
  }

  function baseName(name) {
    return String(name || "file").replace(/\.[^.]+$/, "");
  }

  function formatBytes(bytes) {
    if (!bytes) return "0 B";
    const units = ["B", "KB", "MB", "GB"];
    let value = bytes;
    let unit = 0;
    while (value >= 1024 && unit < units.length - 1) {
      value /= 1024;
      unit += 1;
    }
    return `${value.toFixed(value >= 10 || unit === 0 ? 0 : 1)} ${units[unit]}`;
  }

  function formatBytesPrecise(bytes) {
    if (!bytes) return "0 B";
    const units = ["B", "KB", "MB", "GB"];
    let value = bytes;
    let unit = 0;
    while (value >= 1024 && unit < units.length - 1) {
      value /= 1024;
      unit += 1;
    }
    const decimals = unit === 0 ? 0 : 2;
    return `${value.toFixed(decimals)} ${units[unit]}`;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  }

  function naturalSort(a, b) {
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
