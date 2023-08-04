export default function Table() {
  return (
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Invoices</h3>
        <div class="card-options">
          <form>
            <div class="input-group">
              <input
                type="text"
                class="form-control form-control-sm"
                placeholder="Search something..."
                name="s"
              />
              <span class="input-group-btn ml-2">
                <button class="btn btn-icon btn-sm" type="submit">
                  <span class="fe fe-search"></span>
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover table-striped table-vcenter">
            <thead>
              <tr>
                <th>Invoice No.</th>
                <th>Clients</th>
                <th>Date</th>
                <th>Type</th>
                <th>Status</th>
                <th class="w100">Amount</th>
                <th class="w150">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#LA-5218</td>
                <td>vPro tec LLC.</td>
                <td>07 March, 2018</td>
                <td>
                  <i
                    class="payment payment-cirrus"
                    data-toggle="tooltip"
                    title=""
                    data-original-title="payment payment-cirrus"
                  ></i>
                </td>
                <td>
                  <span class="badge badge-success">Approved</span>
                </td>
                <td>$4,205</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-icon btn-sm btn-sm"
                    title=""
                    data-toggle="tooltip"
                    data-placement="top"
                    data-original-title="Send Invoice"
                  >
                    <i class="icon-envelope text-info"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-icon btn-sm"
                    title=""
                    data-toggle="tooltip"
                    data-placement="top"
                    data-original-title="Print"
                  >
                    <i class="icon-printer"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-icon btn-sm"
                    title=""
                    data-toggle="tooltip"
                    data-placement="top"
                    data-original-title="Delete"
                  >
                    <i class="icon-trash text-danger"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
