<center>
<h1>Invoice0</h1>
<p>Simple invoicing system for small businesses (sole proprietorship)</p>
</center>

> [!WARNING]  
> This project is still in development and is not ready for production use.


# Getting Started

This projects aims to provide a simple invoicing system for small businesses (sole proprietorship). 

It is built with the following technologies:
- [Tanstack Start](https://tanstack.com/start/latest)
- [Zero](https://zero.rocicorp.dev/)
- [Drizzle](https://orm.drizzle.team/)
- [Better Auth](https://www.better-auth.com/)


## Installation

1. Install dependencies `yarn install`
2. Make sure you have [Task](https://taskfile.dev/installation/) installed
3. Make sure you have Docker installed (or any other way to spin up a docker compose file)
4. Run `task dev-up` to start the development environment

## Notes

- Any issues? Run `task dev-nuke` to nuke your Docker configuration and start from scratch