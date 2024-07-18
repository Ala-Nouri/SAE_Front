export class FormFactory {
  constructor() {}

  createForm(type:string, doc:any){
      switch(type){
          case "invoice":
              return [
                  {
                      type: "text",
                      label: "invoice_number",
                      name: "invoice_number",
                      value: doc.invoice_number,
                      validations: [
                        {
                          name: "required",
                          validator: "required",
                          message: "Name is required"
                        }
                      ]
                    },
                    {
                      type: "text",
                      label: "endorsee",
                      name: "endorsee",
                      value: doc.endorsee,
                      validations: [
                        {
                          name: "required",
                          validator: "required",
                          message: "Endorsee is required"
                        }
                      ]
                    },
                    {
                      type: "text",
                      label: "date",
                      name: "date",
                      value: doc.date,
                      validations: [
                        {
                          name: "required",
                          validator: "required",
                          message: "Date is required"
                        }
                      ]
                    },
                    {
                      type: "text",
                      label: "total",
                      name: "total",
                      value: doc.total,
                      validations: [
                        {
                          name: "required",
                          validator: "required",
                          message: "Total is required"
                        }
                      ]
                    }
                  ]
          default:
              throw new Error("Invalid document type");
      }
    }
}
