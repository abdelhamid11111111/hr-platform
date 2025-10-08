
export interface Department {
    id: number;
    name: string;
    location: string;
    createdAt: string
}

export type DepartmentUpdate = Omit<Department, 'createdAt' | 'id'>

export type DptInEmpForm = Pick<Department, 'name' | 'id'>


export interface Employee {
    id: number;
    name: string;
    salary: number;
    phone: string;
    email: string;
    position: string;
    dateOfBirth: string;
    profilePic: string;
    department: Department
    departmentId: number;
    createdAt: string
    review: Review
}

export type EmpTable = Pick<Employee, 'id' | 'name' | 'department' | 'position' | 'profilePic'>


export type EmpReviewForm = Pick<Employee, 'id' | 'name'>


export interface Review {
    id: number;
    rating: number;
    notes: string;
    employeeId: number;
    employee: Employee;
    createdAt: string;
    updatedAt: string
}