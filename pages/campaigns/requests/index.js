import React, { Component } from "react";
import Layout from "../../../components/Layout";
import { Button, Table } from "semantic-ui-react";
import { Link } from "../../../routes";
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";
class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();
    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((el, i) => {
          return campaign.methods.requests(i).call();
        })
    );
    return { address, requests, requestCount, approversCount };
  }
  renderRow() {
    return this.props.requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          address={this.props.address}
          approversCount={this.props.approversCount}
        />
      );
    });
  }
  render() {
    const { Header, Row, HeaderCell, Body } = Table;
    return (
      <Layout>
        <Link floated="left" route={`/campaigns/${this.props.address}`}>
          Back
        </Link>
        <h5>Request List</h5>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <Button primary floated="right" style={{ marginBottom: 20 }}>
            Add request
          </Button>
        </Link>

        <Table>
          <Header>
            <Row>
              <HeaderCell> ID</HeaderCell>
              <HeaderCell> Description</HeaderCell>
              <HeaderCell> Amount</HeaderCell>
              <HeaderCell> Recipient</HeaderCell>
              <HeaderCell> Approval Count</HeaderCell>
              <HeaderCell> Approve</HeaderCell>
              <HeaderCell> Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRow()}</Body>
        </Table>
        <div>Found {this.props.requestCount} requests</div>
      </Layout>
    );
  }
}
export default RequestIndex;
