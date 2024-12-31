# SeaWeedFS filesystem

## Prerequisites

-   Node.js and npm installed
-   PostgreSQL installed
-   SeaweedFS binaries downloaded
-   Git installed

## Project Setup

1. Clone the repository:

```bash
git clone [repository-url]
```

2. Set up the backend:

```bash
cd seaweedfs/back
npm install
```

## Database Configuration

1. Create a PostgreSQL database:

```sql
CREATE DATABASE seaweedfs;
```

2. Configure environment variables:

-   Create a `.env` file in the `back` directory
-   Add your PostgreSQL connection string:

```
DATABASE_URL="postgresql://username:password@localhost:5432/seaweedfs"
```

3. Initialize the database:

```bash
npx prisma migrate dev --name init
```

## SeaweedFS Setup

1. Create a directory for SeaweedFS data:

```bash
mkdir -p tmp/data1
```

2. Start the SeaweedFS master server:

```bash
./weed master
```

3. Start the SeaweedFS volume server:

```bash
./weed volume -dir="tmp/data1" -max=1 -mserver="localhost:9333" -port=8081
```

## Running the Application

Start the backend server:

```bash
npm start
```

The server should now be running and ready to accept connections!

### Troubleshooting

-   Make sure all required ports are available (9333 for master server, 8081 for volume server)
-   Verify that the PostgreSQL service is running
-   Ensure all environment variables are properly set
-   Check that the tmp/data1 directory has proper read/write permissions

You're all set up! Feel free to enhance and customize the project as you like. I’ve provided the basic setup—now it's your turn to take it further! 😊

## Authors

-   [@shadhin8121](https://www.github.com/shadhin8121)
