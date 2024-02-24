echo "Starting server..."
cd server
yarn
yarn build
yarn start &

sleep 5

echo "Setting up client..."
cd ..
cd client
yarn
yarn build

echo "Starting client..."
yarn preview
