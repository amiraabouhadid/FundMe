import React, { Component } from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import Layout from "../../components/Layout";
import campaignGetter from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeFrom";
import { Link } from "../../routes";
class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = campaignGetter(props.query.address);
    const summary = await campaign.methods.getSummary().call();

    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
    };
  }
  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount,
    } = this.props;

    const items = [
      {
        header: manager,
        meta: "Address of manager",
        description:
          "the manager created this campaign and can create requests to withdraw money",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minimumContribution,
        meta: "Minimum Contribution(wei)",
        description:
          "you must contribute at least the mimimum contribution to be considered a contributor",
      },
      {
        header: requestsCount,
        meta: "Number of Requests",
        description:
          "A request to withdraw money from campaign. Request must be approved by more than 50% of contributors",
      },
      {
        header: approversCount,
        meta: "Number of Approvers",
        description: "Number of contributors to the campaign",
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign Balance (Ether)",
        description: "Current campaign balance left to spend",
      },
    ];
    return <Card.Group items={items} />;
  }
  render() {
    return (
      <Layout>
        {" "}
        <h3>Campaign Details </h3>
        <h4>Campaign Address: {this.props.address}</h4>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <Button primary>View Requests</Button>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
