#!/bin/bash

echo "Starting AI Learning Aggregator..."
echo ""

# Check if port 3001 is in use and kill it
if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null ; then
    echo "Port 3001 is already in use. Killing existing process..."
    lsof -ti:3001 | xargs kill -9
    sleep 2
fi

# Start backend server
echo "Starting backend server..."
npm run dev:server &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Start frontend
echo "Starting frontend..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "Both servers are starting..."
echo "Backend: http://localhost:3001"
echo "Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers..."

# Wait for user interrupt
wait

