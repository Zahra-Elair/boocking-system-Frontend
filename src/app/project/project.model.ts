export interface Project {
    id?: number;
    projectName?: string;
    description?: string;
    status?: number;
    clientCompany?: string;
    projectLeader?: string;
    estimatedBudget?: number;
    spentBudget?: number;
    estimatedDuration?: number;
}
