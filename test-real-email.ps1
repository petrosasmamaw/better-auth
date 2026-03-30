# Test with REAL email address

Write-Host ""
Write-Host "Testing Email Verification with REAL EMAIL..."
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# User details - Using YOUR REAL EMAIL
$TEST_NAME = "Your Name"
$TEST_EMAIL = "asmamawpetros@gmail.com"
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

    Write-Host "RESPONSE STATUS: $($response.StatusCode)" -ForegroundColor Green
    Write-Host ""
    Write-Host "Response Body:" -ForegroundColor Yellow
    $jsonResponse = $response.Content | ConvertFrom-Json
    $jsonResponse | ConvertTo-Json -Depth 10
    
    Write-Host ""
    Write-Host "User Created:" -ForegroundColor Green
    Write-Host "  ID: $($jsonResponse.user.id)"
    Write-Host "  Email: $($jsonResponse.user.email)"
    Write-Host "  Email Verified: $($jsonResponse.user.emailVerified)"
} catch {
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response: $responseBody" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host ""
Write-Host "TEST COMPLETED!" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Check your email: $TEST_EMAIL"
Write-Host "2. Look for verification email from: asmamawpetros@gmail.com"
Write-Host "3. Click the 'Verify Email Address' button in the email"
Write-Host "4. You should be redirected to http://localhost:3000"
Write-Host ""
Write-Host "Note: The email should arrive in a few seconds"
