export interface DataRepositoryInterface {
	getAll(): Promise<any[]>;
	getById(id: string): Promise<any>;
}
