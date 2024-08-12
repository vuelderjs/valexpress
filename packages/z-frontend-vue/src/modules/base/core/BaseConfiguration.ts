import { ZodError } from 'zod'
import '../../../global.d'

import { Configurations, ConfigurationsSchema } from "./schemas/configurations.schema"

export default class BaseConfiguration {

    public static configurations: Configurations = {
        VUELDERJS_API_URL: "http://localhost:4000"
    }
    
    constructor(){
        throw 'BaseConfiguration is a static class'
    }

    public static async fetchConfigurations(){
        try {
            const response = await fetch(`${DYNAMIC_CONFIGURATION_URL}`)
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
    
            const jsonResponse = await response.json()
    
            Object.assign(BaseConfiguration.configurations, ConfigurationsSchema.parse(jsonResponse))
        } catch (error) {
            if(error instanceof ZodError){
                console.error("ZodError: ", error.issues)
            }else{
                console.error(error)
            }
        }
    }
}  