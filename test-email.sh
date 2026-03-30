#!/bin/bash

# Test email verification by creating a user

echo "🧪 Testing Email Verification..."
echo "================================"

# User details
TEST_NAME="Test User"
TEST_EMAIL="testuser_$(date +%s)@example.com"
TEST_PASSWORD="TestPassword123!"

echo ""
echo "📝 Test Details:"
echo "  Name: $TEST_NAME"
echo "  Email: $TEST_EMAIL"
echo "  Password: $TEST_PASSWORD"
echo ""

# Call signup endpoint
echo "🔔 Calling signup endpoint..."
curl -X POST http://localhost:3000/api/auth/sign-up/email \
  -H "Content-Type: application/json" \
  -H "Cookie: " \
  -d "{
    \"name\": \"$TEST_NAME\",
    \"email\": \"$TEST_EMAIL\",
    \"password\": \"$TEST_PASSWORD\"
  }" \
  -v

echo ""
echo ""
echo "✅ Test completed. Check the server console for email logs."
echo ""
echo "💡 Expected console output:"
echo "  - 📧 Sending verification email to: $TEST_EMAIL"
echo "  - ✅ Verification email sent successfully!"
