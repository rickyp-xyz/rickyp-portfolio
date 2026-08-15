FILE_PATH=$1

gpg --verify "${FILE_PATH}.asc" "$FILE_PATH"
