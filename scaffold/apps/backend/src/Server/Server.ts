import { BaseContext } from "@apollo/server";
import { ApolloServer } from "@apollo/server";
import Fastify, { FastifyInstance } from 'fastify';
import fastifyApollo from '@as-integrations/fastify'
import routes from "./routes";
import { PERMISSIONS } from './permissions'
import mongoose from 'mongoose'
import { PermissionsService, RoleService, UserService } from "@valexpress/users-backend";

export default class Server {
    private static _instance: Server
    
    private _fastify: FastifyInstance | null = null
    private _apollo: ApolloServer<BaseContext> | null = null

    constructor(
        private _apolloServer: (fastify: FastifyInstance) => ApolloServer<BaseContext>,
        // private _apiRestInitialization: ApiRest
    ){
        if(Server._instance) {
            return Server._instance
        }

        this._fastify = Fastify()

        this._apollo = this._apolloServer(this._fastify)

        Server._instance = this
    }

    public async start(port: number, MONGODB_URI: string) {
        if(!this._apollo || !this._fastify) {
            throw new Error('Apollo server or fastify instance not initialized')
        }

        await this.dataBaseConnection(MONGODB_URI)

        await this.instancePermissions()
        await this.initializationRoles()
        await this.initializationUsers()

        await this._apollo.start();
  
        await this._fastify.register(fastifyApollo(this._apollo), {
            //@ts-ignore
            context: context => ({ token: context.headers.authorization }),
        });

        this.corsImplementation()

        this._fastify.get('/', async (request, reply) => {
            return { hello: 'world' };
        })

        this._fastify.register(routes, { prefix: '/api/v1' })

        await this._fastify.listen({ port: port })

        console.log('Backend server running on http://localhost:' + port);
    }

    private corsImplementation() {
        if(!this._fastify) {
            throw new Error('Fastify instance not initialized')
        }

        this._fastify.register(require('@fastify/cors'), (instance) => {
            return (req: any, callback: any) => {
              const corsOptions = {
                // This is NOT recommended for production as it enables reflection exploits
                origin: true
              };
          
              // do not include CORS headers for requests from localhost
              if (/^localhost$/m.test(req.headers.origin)) {
                corsOptions.origin = false
              }
          
              // callback expects two parameters: error and options
              callback(null, corsOptions)
            }
        })
    }

    private async instancePermissions() {
        await PermissionsService.createManyPermissions(PERMISSIONS)
    }

    private async dataBaseConnection(MONGODB_URI: string) {
        try {
            await mongoose.connect(MONGODB_URI)
            console.log('Data base connection established')
        } catch (error) {
            console.error(error)
        }
    }

    private async initializationRoles() {
        await RoleService.createSuperUserRole()
        await RoleService.createCommonUserRole()
    }

    private async initializationUsers() {
        await UserService.createSuperUser()
    }
}