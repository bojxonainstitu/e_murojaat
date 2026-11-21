# Android / iOS WebView sozlamalari

> ⚠ **Qurilmada sinalmagan.** Sayt brauzerda 320–768 px kengliklarda Playwright bilan tekshirilgan, lekin haqiqiy WebView'da emas.

## Umumiy talablar
- Sayt **HTTPS** orqali yoki `http://localhost` dan ochilishi kerak: `getUserMedia` (mikrofon) va `navigator.clipboard` faqat xavfsiz kontekstda ishlaydi.
- JavaScript va DOM storage (localStorage) yoqilgan boʻlishi kerak.

## Android (`android.webkit.WebView`)
| Imkoniyat | Kerakli sozlama |
|---|---|
| JS va saqlash | `settings.javaScriptEnabled = true`, `settings.domStorageEnabled = true` |
| Mikrofon (ovozli kiritish) | Manifest: `RECORD_AUDIO`, `MODIFY_AUDIO_SETTINGS`; ish vaqtida `RECORD_AUDIO` ruxsatini soʻrash; `WebChromeClient.onPermissionRequest()` da `PermissionRequest.RESOURCE_AUDIO_CAPTURE` ni `grant()` qilish |
| Fayl tanlash / kamera | `WebChromeClient.onShowFileChooser()` ni amalga oshirish (`FileChooserParams.createIntent()`, kamera uchun `MediaStore.ACTION_IMAGE_CAPTURE` + `FileProvider`); Manifest: `CAMERA` (rasmga olish uchun) |
| DOCX yuklab olish (blob: URL) | `setDownloadListener` blob URL'ni oʻzi qabul qilmaydi → JS interfeysi orqali blob'ni base64 qilib olish (`addJavascriptInterface`) yoki `DownloadManager` uchun serverdan fayl berish |
| Chop etish / PDF | `window.print()` WebView'da ishlamaydi → `WebView.createPrintDocumentAdapter()` + `PrintManager` ni JS koʻprigi orqali chaqirish |
| Klaviatura va safe-area | `windowSoftInputMode="adjustResize"`; sayt `env(safe-area-inset-*)` va `100dvh` dan foydalanadi |

## iOS (`WKWebView`)
| Imkoniyat | Kerakli sozlama |
|---|---|
| Mikrofon | `Info.plist`: `NSMicrophoneUsageDescription`; iOS 15+: `WKUIDelegate.webView(_:requestMediaCapturePermissionFor:...)` → `.grant`; `configuration.allowsInlineMediaPlayback = true` |
| Kamera / fayl tanlash | `Info.plist`: `NSCameraUsageDescription`, `NSPhotoLibraryUsageDescription`; `<input type=file capture>` WKWebView'da tizim oynasini ochadi |
| MediaRecorder | iOS 14.3+ Safari/WKWebView qoʻllaydi; sayt `audio/webm` → `audio/mp4` zaxirasini tanlaydi |
| DOCX yuklab olish | iOS 14.5+: `WKDownloadDelegate` (`navigationAction.shouldPerformDownload`); blob URL uchun JS → native koʻprik kerak boʻlishi mumkin |
| Chop etish | `window.print()` → `WKWebView.printFormatter()` + `UIPrintInteractionController` (JS xabar orqali) |
| Clipboard | Foydalanuvchi bosgandagina ishlaydi; saytda `execCommand('copy')` zaxirasi bor |
| Matn kattalashuvi | Kiritish maydonlarida shrift ≥16 px — iOS avtomatik zoom qilmaydi |

## Tekshirish roʻyxati (qurilmada)
- [ ] Mikrofon ruxsati soʻraladi; rad etilsa tushunarli xabar chiqadi
- [ ] Fayl tanlash va kameradan rasm olish ishlaydi
- [ ] DOCX fayl saqlanadi va ochiladi
- [ ] Chop etish / PDF oynasi ochiladi
- [ ] 320 px ekranda gorizontal skroll yoʻq, klaviatura maydonlarni yopmaydi
