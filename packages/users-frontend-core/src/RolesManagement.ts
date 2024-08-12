import RolesProviders from "./providers/RolesProviders"

export default class RolesManagement {
    private static _instance: RolesManagement

    constructor() {
        if(RolesManagement._instance) {
            return RolesManagement._instance
        }
        RolesManagement._instance = this
    }

    private _roles: {id: string, name: string, permissions: {id: string, name: string}[], createdBy: string}[] = []
    private _permissions: {id: string, name: string}[] = []

    public get roles(): {id: string, name: string, permissions: {id: string, name: string}[], createdBy: string}[] {
        return [...this._roles]
    }
    public get permissions(): {id: string, name: string}[] {
        return [...this._permissions]
    }

    private _fetchRolesLoading = false
    private _fetchRolesError = ''

    public get fetchRolesLoading(): boolean {
        return this._fetchRolesLoading
    }
    public get fetchRolesError(): string {
        return this._fetchRolesError
    }

    public cleanFetchRolesError = () => this._fetchRolesError = ''
    public async fetchRoles(){
        try {
            this._fetchRolesLoading = true
            const { data: { roleFetch } } = await RolesProviders.roleFetch()
            this._roles = [...roleFetch]
        } catch (error) {
            this._fetchRolesError = error instanceof Error ? error.message : 'Error desconocido'            
        } finally {
            this._fetchRolesLoading = false
        }
    }

    private _fetchPermissionsLoading = false
    private _fetchPermissionsError = ''

    public get fetchPermissionsLoading(): boolean {
        return this._fetchPermissionsLoading
    }
    public get fetchPermissionsError(): string {
        return this._fetchPermissionsError
    }

    public cleanFetchPermissionsError = () => this._fetchPermissionsError = ''
    public async fetchPermissions(){
        try {
            this._fetchPermissionsLoading = true
            const { data: { permissionsFetch } } = await RolesProviders.permissionsFetch()
            this._permissions = [...permissionsFetch]
        } catch (error) {
            this._fetchPermissionsError = error instanceof Error ? error.message : 'Error desconocido'
        } finally {
            this._fetchPermissionsLoading = false
        }
    }

    private _createRoleLoading: boolean = false
    private _createRoleError: { field?: string, message?: string } = {}

    public get createRoleLoading(): boolean {
        return this._createRoleLoading
    }
    public get createRoleError(): { field?: string, message?: string } {
        return this._createRoleError
    }

    public cleanCreateRoleError = () => this._createRoleError = {}
    public async createRole(name: string, permissions: string[]){
        try {
            this._createRoleLoading = true
            const { data: { roleCreate } } = await RolesProviders.roleCreate({ name, permissions })
            this._roles = [...this._roles, roleCreate]
        } catch (error) {
            if(!(error instanceof Error)) return this._createRoleError = { message: 'Error desconocido' }
            if(error.message.includes('E11000') && error.message.includes('index: name')){
                this._createRoleError = { field: 'name', message: 'Este rol ya se encuentra registrado' }
            }else{
                this._createRoleError = { message: error.message }
            }
        } finally {
            this._createRoleLoading = false
        }
    }

    private _updateRoleLoading = false
    private _updateRoleError = ''

    public get updateRoleLoading(): boolean {
        return this._updateRoleLoading
    }
    public get updateRoleError(): string {
        return this._updateRoleError
    }

    public cleanUpdateRoleError = () => this._updateRoleError = ''
    public async updateRole(id: string, name: string, permissions: string[]){
        try {
            this._updateRoleLoading = true
            const { data: { roleUpdate } } = await RolesProviders.roleUpdate(id, { name, permissions })
            this._roles = this._roles.map(role => role.id === roleUpdate.id ? roleUpdate : role)
        } catch (error) {
            this._updateRoleError = error instanceof Error ? error.message : 'Error desconocido'
        } finally {
            this._updateRoleLoading = false
        }
    }

    private _deleteRoleLoading = false
    private _deleteRoleError = ''

    public get deleteRoleLoading(): boolean {
        return this._deleteRoleLoading
    }
    public get deleteRoleError(): string {
        return this._deleteRoleError
    }

    public cleanDeleteRoleError = () => this._deleteRoleError = ''
    public async deleteRole(id: string){
        try {
            this._deleteRoleLoading = true
            const { data: { roleDelete } } = await RolesProviders.roleDelete(id)
            this._roles = this._roles.filter(role => role.id !== roleDelete.id)
        } catch (error) {
            this._deleteRoleError = error instanceof Error ? error.message : 'Error desconocido'
        } finally {
            this._deleteRoleLoading = false
        }
    }
}