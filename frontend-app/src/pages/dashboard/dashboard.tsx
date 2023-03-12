import React  from "react";
import "./dashboard.scss";
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons";
import PaginationComponent from "../../shared/pagination/pagination.tsx";
import { getLoggedInUser, getOrderItemsAPI,deleteOrderItem,updateSellerInfoApi } from "../../data/helpers/services.tsx";
import moment from 'moment';
import Dropdown from "react-bootstrap/Dropdown";
import Kebab from "../../assets/images/kebab.svg";
import EditPlan from "../../assets/images/edit-lessonplan.svg";
import DeletePlan from "../../assets/images/delete-lessonplan.svg";
import { confirmDialog } from "primereact/confirmdialog";
import toast from "react-hot-toast";
import { showCard, closeCard } from "../../data/helpers/show-hide-card.tsx";
import CloseCircle from "../../assets/images/close-circle.svg";


export interface SortBy {
  dataField: string;
  order: string;
}

const ArrowUp = {
  color: "#753BBD",
  width: "7px",
};
const ArrowDown = {
  color: "#837DA1",
  width: "7px",
};

export interface State {
  dataField: string;
  order: string;
  tableData: any[];
  sellerinfo: any;
  dataPerPage: number;
  totalPageDate: number;
  currentPage: number;
  userName: string;
  pageReady: boolean;
}

class Dashboard extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    let tableData: any[] = [];

    this.state = {
      dataField: "SN",
      order: "asc",
      tableData: tableData,
      sellerinfo: {} as any,
      dataPerPage: 10,
      totalPageDate: 0,
      currentPage: 1,
      userName: "",
      pageReady: false,
    };
  }

  componentDidMount(): void {
    setTimeout(() => {
      this.getorderItems();
      this.setState({ userName: getLoggedInUser()?.sellerId || "Admin", pageReady: true });
    }, 6000);
  }

  getorderItems = () => {
    getOrderItemsAPI(this.state.currentPage, this.state.dataPerPage, "").then((res) => {
      this.setState({ tableData: res.data, totalPageDate: res.total });
    });
  };
  pageHandler = (pageNumber: any) => {
    this.setState({ currentPage: pageNumber }, () => {
      let indexOfLastPost = this.state.currentPage * this.state.dataPerPage;
      let indexOfFirstPost = indexOfLastPost - this.state.dataPerPage;
      this.getorderItems();
    });
  };



  deleteOrderItems = (data: any) => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => {
        toast.promise(
            deleteOrderItem(data.id).then(() => {
            this.getorderItems();
          }),
          {
            loading: "Deleting order item",
            success: (res: any) => `Item deleted successfully`,
            error: `Error deleting order`,
          }
        );
      },
      reject: () => {},
    });
  };

  sortTableData(key: any, order: any) {
    let records: any[] = this.state.tableData;
    if (order === "asc") {
      records.sort((a, b) => (a[key] < b[key] ? -1 : 1));
    } else {
      records.sort((a, b) => (a[key] > b[key] ? -1 : 1));
    }
    this.setState({ dataField: key, order: order, tableData: records });
  }
  updateSellerInfo =()=>{
    this.setState({sellerinfo:{} as any},()=>{
      showCard("editclassPlanCard", "editclassPlanCardOverlay")
    })
  }

  updateSeller = () => {
    toast
      .promise(updateSellerInfoApi(this.state.sellerinfo), {
        loading: "Updating seller info",
        success: "Your have successfully updated your info",
        error: "Error updating info , Please try again",
      })
      .then(() => {
        closeCard("editclassPlanCard", "editclassPlanCardOverlay");
        this.getorderItems();
      });
  };
  render() {
    return (
    
        <div className="dashboard-wrap">
          <div className="bold-text">Hello {this.state.userName} 👋🏾</div>
          <div className="thin-text">Let’s check your analytics today!</div>
   
          <div className="table-title">
            <div className="header">Orders</div>
          </div>
          <div className="action-btn-wrap">

          <div className="btn-wrap" onClick={() => this.updateSellerInfo()}>
              <div className="cta-button">Update Seller Info</div>
            </div>
            
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>
                    SN{" "}
                    {this.state.dataField === "id" ? (
                      <CaretUpFill onClick={() => this.sortTableData("id", "asc")} style={ArrowUp} />
                    ) : (
                      <CaretDownFill onClick={() => this.sortTableData("id", "desc")} style={ArrowDown} />
                    )}{" "}
                  </th>
                  <th>
                    Product Id{" "}
                    {this.state.dataField === "product_id" ? (
                      <CaretUpFill onClick={() => this.sortTableData("product_id", "asc")} style={ArrowUp} />
                    ) : (
                      <CaretDownFill onClick={() => this.sortTableData("product_id", "desc")} style={ArrowDown} />
                    )}{" "}
                  </th>
                  <th>
                    Price{" "}
                    {this.state.dataField === "price" ? (
                      <CaretUpFill style={ArrowUp} onClick={() => this.sortTableData("price", "asc")} />
                    ) : (
                      <CaretDownFill style={ArrowDown} onClick={() => this.sortTableData("price", "desc")} />
                    )}{" "}
                  </th>
                  <th>
                    Date Created{" "}
                    {this.state.dataField === "date" ? (
                      <CaretUpFill style={ArrowUp} onClick={() => this.sortTableData("date", "asc")} />
                    ) : (
                      <CaretDownFill style={ArrowDown} onClick={() => this.sortTableData("date", "desc")} />
                    )}{" "}
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.tableData &&
                  this.state.tableData.map((value: any, index: any) => {
                    return (
                      <tr key={index}>
                        <td>{this.state.tableData[index].id}</td>
                        <td>{this.state.tableData[index].product_id}</td>
                        <td>{this.state.tableData[index].price}</td>
                        <td>{moment(this.state.tableData[index].created).format("MMM Do YYYY")}</td>
                        <td>
                          <Dropdown className="more-dropdown">
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                              <img src={Kebab} alt="more action" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item onClick={() => this.deleteOrderItems(value)}>
                                <img src={DeletePlan} alt="DeletePlan" /> Delete Lesson Plan
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    );
                  })}
                { this.state.tableData && this.state.tableData.length < 1 ? (
                  <tr className="no-data">
                    <td colSpan={9}>
                      <p>No data available</p>
                    </td>
                  </tr>
                ) : (
                  ""
                )}
              </tbody>
            </table>
            <PaginationComponent
              onChangepage={this.pageHandler}
              postsPerPage={this.state.dataPerPage}
              totalPosts={this.state.totalPageDate}
            />

                 {/* Edit Class Plan Card */}
                 <div id="editclassPlanCardOverlay" className="action-overlay">
                        <div id="editclassPlanCard" className="action-card-wrap">
                            <div className="card-header"><div className="card-title">Edit Class</div>
                                <img onClick={() => closeCard('editclassPlanCard', 'editclassPlanCardOverlay')} src={CloseCircle} alt="close" /></div>
                            <div className="form-wrap">
                          
                                <div className="input-wrap">
                                    <label htmlFor="class">City</label>
                                    <input value={this.state.sellerinfo.city || ""} onChange={(e)=>{this.setState(prev => ({sellerinfo:{...prev.sellerinfo,city:e.target.value}}))}} className="control text" name="EditName" type="text" placeholder="Enter City Name" />
                                </div>
                                <div className="input-wrap">
                                    <label htmlFor="class">State</label>
                                    <input value={this.state.sellerinfo.state || ""}  onChange={(e)=>{this.setState(prev => ({sellerinfo:{...prev.sellerinfo,state:e.target.value}}))}} className="control text" name="EditOrderNo" type="text" placeholder="Enter State" />
                                </div>

                                <div className="submit-button">
                                    <button onClick={this.updateSeller}>Save Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
          </div>
        </div>
   
    );
  }
}

export default Dashboard;
