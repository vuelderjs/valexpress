import UsersProviders from "./providers/UsersProviders"

export default class DataUsersManagement {
    private static _instance: DataUsersManagement

    private _docs: {id: string, email: string, role: {name: string, permissions: {name: string}}, name: string, surname: string, enable: boolean}[] = []
    private _page: number = 1
    private _limit: number = 10
    private _total: number = 0
    private _sortBy: string = ''
    private _sortDesc: boolean = true
    private _filters: {email?: string, name?: string, surname?: string, role?: string, createdBy?: string, enable?: boolean} = {}
    private _docsAreLoading: boolean = false

    constructor(){
        if(DataUsersManagement._instance) {
            return DataUsersManagement._instance
        }
        DataUsersManagement._instance = this
    }

    get docsAreLoading(){ 
        return this._docsAreLoading
    }

    get docs(){
        return [...this._docs]
    }

    get page(){
        return this._page
    }

    get limit(){
        return this._limit
    }

    get total(){
        return this._total
    }

    get sortBy(){
        return this._sortBy
    }

    get sortDesc(){
        return this._sortDesc
    }

    get filters(){
        return {...this._filters}
    }

    updateFilters(filters: {email?: string, name?: string, surname?: string, role?: string, createdBy?: string, enable?: boolean}){
        this._filters = {...this._filters, ...filters}
    }

    updateSortBy(sortBy: string){
        this._sortBy = sortBy
    }

    updateSortDesc(sortDesc: boolean){
        this._sortDesc = sortDesc
    }

    updateLimit(limit: number){
        this._limit = limit
        this.fetchUsers()
    }
    
    cleanFilters(){
        this._filters = {}
        this.fetchUsers()
    }

    applyFilters(filters: {email?: string, name?: string, surname?: string, role?: string, createdBy?: string, enable?: boolean}){
        this._filters = filters
        this.fetchUsers()
    }

    updatePage(page: number){
        this._page = page
        this.fetchUsers()
    }

    private _fetchUsersError: string = ''
    get fetchUsersError(){
        return this._fetchUsersError
    }
    public closeFetchUsersError(){
        this._fetchUsersError = ''
    }

    public async fetchUsers(){
        try {
            this._docsAreLoading = true
            const { data: { userFetch: {docs, page, limit, total} } } = await UsersProviders.userFetch(this._filters, this._sortBy, this._sortDesc, this._limit, this._page)
            this._docs = [...docs]
            this._page = page
            this._limit = limit
            this._total = total
        } catch (error) {
            this._fetchUsersError = error instanceof Error ? error.message : 'Error desconocido'
        } finally {
            this._docsAreLoading = false
        }
    }

    // UPDATE USER CONTROL VARIABLES
    private _updateUserLoading: boolean = false
    get updateUserLoading(){
        return this._updateUserLoading
    }
    private _updateUserError: {field?: string, message?: string} = {}
    get updateUserError(){
        return this._updateUserError
    }
    public closeUpdateUserError(){
        this._updateUserError = {}
    }
    public async updateUser(id: string, user: {email?: string, password?: string, role?: string, name?: string, surname?: string, enable?: boolean}) {
        try {
            this._updateUserLoading = true
            const {data: {userUpdate}} = await UsersProviders.userUpdate(id, user)
            const index = this._docs.findIndex(doc => doc.id === id)
            if(index === -1) return
            this._docs[index] = { ...this._docs[index], ...userUpdate }
        } catch (error) {
            if(!(error instanceof Error)) return this._updateUserError = { message: 'Error desconocido' }
            
            if(error.message.includes('E11000') && error.message.includes('index: email')){
                this._updateUserError = { field: 'email', message: 'Este email ya se encuentra registrado' }
            }else if (error.message === 'Can not disable system user'){
                this._updateUserError = { message: error.message }
            }else {
                this._updateUserError = { message: error.message }
            }
            
        } finally {
            this._updateUserLoading = false
        }
    }

    public async createUser(user: {email: string, password: string, role: string, name?: string, surname?: string, enable?: boolean}) {
        const { data: { userCreate } } = await UsersProviders.userCreate(user)
        this._docs.unshift(userCreate)
        this._total += 1
        if(this._docs.length > this._limit) this._docs.pop()
    }
}