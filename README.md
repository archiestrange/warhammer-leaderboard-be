# How to run the service

1. Run the `yarn` command to install dependancies

2. Set up database (skip to step 2 if you know how/already done)

   1. Install PostgreSQL https://www.postgresql.org/download/

   2. Install PGAdmin4 https://www.pgadmin.org/download/

   3. Launch PGAdmin4

   4. Connect to the PostgreSQL server

      1. In pgAdmin 4, on the left sidebar, you should see a "Servers" node.
         Right-click on it and choose "Register" and then "Server...".
      2. Fill in the following details in the "Create - Server" dialog:
         General Tab:

         - Name: `A name for your server` (e.g., "localhost").

         Connection Tab:

         - Host name/address: `localhost`
         - Port: `5432` (default PostgreSQL port)
         - Maintenance database: `postgres` (Or something else, this will come up later)
         - Username: `Your PostgreSQL username` (usually postgres by default)
         - Password: `Your PostgreSQL password` (usually test by default)

      3. Click the "Save" button.

   5. Start the PostgreSQL Server (if not automatially running):
      Once you've connected to the server, you can see it under the "Servers" node in pgAdmin.
      Right-click on the server you just created and choose "Start Server" from the context menu.

3. Fill in the information in the `data-source.ts` file with your local database details:

   - The only thing that might need changing is the `database` value. Enter whatever value you used for `Maintenance database` earlier.
   - You may also need to update the `username` and `password` to match your own.

4. Run the `yarn start` command

   - If you do not see `✅ TypeORM initialized.`, something went wrong.

5. Go to http://localhost:4000/ to use the GraphQL playground
