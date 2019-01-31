import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-bootstrap4-modal";
import { removeCoin, clearSelectedCoin } from "../../actions/index";

import "./delete_coin.css";

class DeleteCoin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  onDeleteClick() {
    this.setState({
      showModal: true
    });
  }

  onModalCancel() {
    this.setState({
      showModal: false
    });
  }

  onModalConfirm() {
    const { coinKey } = this.props;
    removeCoin(coinKey);
    // Need to call with this.props.clearSelectedCoin otherwise the action gets called but not the dispatch section
    this.props.clearSelectedCoin();
    this.setState({
      showModal: false
    });
  }

  render() {
    const { showModal } = this.state;
    const { coinTicker } = this.props;

    return (
      <div>
        <div className="delete_coin">
          <button
            type="button"
            className="btn btn-danger"
            data-toggle="modal"
            data-target="#exampleModal"
            onClick={this.onDeleteClick.bind(this)}
          >
            Delete Coin
          </button>
        </div>

        <Modal
          visible={showModal}
          onClickBackdrop={this.onModalCancel.bind(this)}
        >
          <div className="modal-header">
            {/* pass in coin ticket as props here along with id */}
            <h5 className="modal-title">Delete Coin</h5>
          </div>
          <div className="modal-body">
            <p>{`Are you sure you want to delete ${coinTicker}?`}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={this.onModalCancel.bind(this)}
            >
              No
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onModalConfirm.bind(this)}
            >
              Yes
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    coinDetails: state.coinDetails
  };
}

export default connect(
  mapStateToProps,
  { removeCoin, clearSelectedCoin }
)(DeleteCoin);
