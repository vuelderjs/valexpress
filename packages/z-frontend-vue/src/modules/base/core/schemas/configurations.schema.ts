import { z } from 'zod'

export const ConfigurationsSchema = z.object({
    VUELDERJS_API_URL: z.string(),
}).strict()

export type Configurations = z.infer<typeof ConfigurationsSchema>