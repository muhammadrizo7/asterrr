# Rebuilds Aster.html (the whole game in one file) from dist/. No Node.js needed.
# Usage (Windows PowerShell):  powershell -ExecutionPolicy Bypass -File build.ps1
$ErrorActionPreference = 'Stop'
$dist = Join-Path $PSScriptRoot 'dist'
$utf8 = New-Object System.Text.UTF8Encoding $false
function ReadText($name) { [IO.File]::ReadAllText((Join-Path $dist $name), $utf8).TrimStart([char]0xFEFF) }
$html = ReadText 'index.html'
$css = ReadText 'style.css'
$html = $html.Replace('<link rel="stylesheet" href="style.css">', "<style>$css</style>")
$scripts = [regex]::Matches($html, '<script src="([^"]+)"></script>')
foreach ($m in $scripts) {
  $code = ReadText $m.Groups[1].Value
  if ($code -match '</script') { throw "$($m.Groups[1].Value) contains </script and cannot be inlined" }
  $html = $html.Replace($m.Value, "<script>$code</script>")
}
if ($html -match '<script src=|href="style.css"') { throw 'Some files were not inlined' }
[IO.File]::WriteAllText((Join-Path $PSScriptRoot 'Aster.html'), $html, $utf8)
Write-Host ("Aster.html rebuilt: {0:N0} bytes, {1} scripts inlined" -f $html.Length, $scripts.Count)
