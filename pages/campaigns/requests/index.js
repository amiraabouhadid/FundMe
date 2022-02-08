import React, { Component } from "react";
import Layout from "../../../components/Layout";
import { Button } from "semantic-ui-react";
import { Link } from "../../../routes";
class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    return { address };
  }
  render() {
    return (
      <Layout>
        <h5>Request List</h5>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <Button primary>Add request</Button>
        </Link>
      </Layout>
    );
  }
}
export default RequestIndex;
