
export interface Department {
    id: number;
    name: string;
    location: string;
    createdAt: string
}

export type DepartmentUpdate = Omit<Department, 'createdAt' | 'id'>

export type DptInEmpForm = Pick<Department, 'name' | 'id'>