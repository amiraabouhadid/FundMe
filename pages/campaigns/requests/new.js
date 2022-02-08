import React, { Component } from "react";
import Layout from "../../../components/Layout";
import { Button, Form, Message, Input } from "semantic-ui-react";
import web3 from "../../../ethereum/web3";
import Campaign from "../../../ethereum/campaign";
import { Link, Router } from "../../../routes";

class RequestNew extends Component {
  state = {
    descripton: "",
    amount: "",
    receipient: "",
    loading: false,
    errorMessage: "",
  };
  static async getInitialProps(props) {
    const address = props.query;
    return address;
  }

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: "" });
    const campaign = Campaign(this.props.address);
    const { descripton, amount, receipient } = this.state;

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(
          descripton,
          web3.utils.toWei(amount, "ether"),
          receipient
        )
        .send({ from: accounts[0] });
      Router.pushRoute(`/campaigns/${this.props.address}/requests`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };
  render() {
    return (
      <Layout>
        <Link route={`/campaigns/${this.props.address}/requests`}>Back</Link>
        <h3> Create a Request</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Description</label>
            <Input
              value={this.state.descripton}
              onChange={(e) => this.setState({ descripton: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Amount (ETH)</label>
            <Input
              value={this.state.amount}
              onChange={(e) => this.setState({ amount: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Receipient</label>
            <Input
              value={this.state.receipient}
              onChange={(e) => this.setState({ receipient: e.target.value })}
            />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Create Request
          </Button>
        </Form>
      </Layout>
    );
  }
}
export default RequestNew;
