import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })

export class PropertiesFactory {
    getProperties (type: string|undefined){
        switch (type) {
            case "Financial":
                return ['Invoices','Budgets','Financial statements ','Expense reports','Tax documents','Payroll records','Purchase orders']


            case "Administrative":
                return ['Correspondence','Policies and procedures','Meeting minutes','Reports','Forms','Contracts and agreements']

            case "Human Resources":
                return ['Resumes and job applications','Employee contracts','Performance reviews','Time sheets','Benefits information','Training materials','Employee handbooks','Termination and resignation documents']

            case "Technical":
                return ['Product manuals','Specifications','Engineering drawings','Software documentation','Troubleshooting guides','Technical reports','Project plans']
        
            default:
                throw new Error("type undifined");
        }
    }
}
