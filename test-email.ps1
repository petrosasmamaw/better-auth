# Test email verification by creating a user

Write-Host ""
Write-Host "Testing Email Verification..."
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# User details
$TEST_NAME = "Test User"
$timestamp = Get-Date -Format "yyyyMMddHHmmss"
$TEST_EMAIL = "testuser_$timestamp@example.com"
$TEST_PASSWORD = "TestPassword123!"

Write-Host "Test Details:" -ForegroundColor Yellow
Write-Host "  Name: $TEST_NAME"
Write-Host "  Email: $TEST_EMAIL"
Write-Host "  Password: $TEST_PASSWORD"
Write-Host ""

# Prepare request body
$body = @{
    name = $TEST_NAME
    email = $TEST_EMAIL
    password = $TEST_PASSWORD
} | ConvertTo-Json

Write-Host "Calling signup endpoint..." -ForegroundColor Cyan
Write-Host ""

# Call signup endpoint
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/auth/sign-up/email" `
        -Method POST `
        -Headers @{"Content-Type" = "application/json"} `
        -Body $body `
        -UseBasicParsing `
        -ErrorAction Stop

    Write-Host "Response Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response Body:"
    $response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response: $responseBody"
    }
}

Write-Host ""
Write-Host ""
Write-Host "Test completed. Check the server console for email logs." -ForegroundColor Green
Write-Host ""
Write-Host "Expected console output:" -ForegroundColor Yellow
Write-Host "  - Sending verification email to: $TEST_EMAIL"
Write-Host "  - Verification email sent successfully!"
