FILE_PATH=$1
FINGERPRINT=FF5E7195EFF7FE5BB85FD6FE9A1AF9B873D9DB82

gpg --local-user "$FINGERPRINT" --armor --detach-sign "$1"

if [ $? -eq 0 ]; then
    echo "Signed file $FILE_PATH using EDDSA key $FINGERPRINT"
    echo "Signature:  ${FILE_PATH}.asc"
fi
