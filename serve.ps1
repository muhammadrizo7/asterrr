# Optional: serve Aster on http://127.0.0.1:4173 without Node.js (Windows PowerShell).
# Usage: powershell -ExecutionPolicy Bypass -File serve.ps1
$root = Join-Path $PSScriptRoot 'dist'
$types = @{ '.html'='text/html; charset=utf-8'; '.css'='text/css'; '.js'='text/javascript'; '.jpg'='image/jpeg'; '.png'='image/png' }
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add('http://127.0.0.1:4173/')
$listener.Start()
Write-Host 'Aster: http://127.0.0.1:4173'
while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  try {
    $name = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath)
    if ($name -eq '/') { $name = '/index.html' }
    if ($name -eq '/Aster.html') { $file = Join-Path $PSScriptRoot 'Aster.html' }
    else { $file = [IO.Path]::GetFullPath((Join-Path $root ('.' + $name))) }
    if ((-not $file.StartsWith($PSScriptRoot)) -or -not (Test-Path $file -PathType Leaf)) { $ctx.Response.StatusCode = 404 }
    else {
      $bytes = [IO.File]::ReadAllBytes($file)
      $ext = [IO.Path]::GetExtension($file)
      if ($types.ContainsKey($ext)) { $ctx.Response.ContentType = $types[$ext] }
      $ctx.Response.Headers.Add('Cache-Control', 'no-store')
      $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    }
  } catch { $ctx.Response.StatusCode = 500 }
  $ctx.Response.Close()
}
