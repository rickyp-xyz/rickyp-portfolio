PUB_KEY_PATH="./public/pgp/public-key.asc"

# check if the public key file exists
if [ ! -f "$PUB_KEY_PATH" ]; then
    echo "File not found at: $PUB_KEY_PATH"
    exit 1
fi

gpg --import "$PUB_KEY_PATH"
