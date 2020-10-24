import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './App.scss';

export class RelationDetails extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      included: {},
      returnError: false,
    };
  }

  componentDidMount() {
    const { did, eid } = this.props;
    this.getRelationData(eid, did, true);
  }

  componentDidUpdate(prevProps) {
    const { did, eid } = this.props;
    const relatedOwnerFlag = eid !== prevProps.eid;
    if (did !== prevProps.did) {
      this.getRelationData(eid, did, relatedOwnerFlag);
    }
  }

  getRelationData(eid, did, rof) {
    const { relatedOwner } = this.props;
    fetch(`https://littlesis.org/api/relationships/${did}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.included.length === 0) {
          return this.setState({
            returnError: true,
          });
        }
        this.setState({
          included: eid === responseData.included[0].id ? responseData.included[1] : responseData.included[0],
          returnError: false,
        });
        const ro =
          eid === responseData.included[0].id
            ? responseData.included[0].attributes.name
            : responseData.included[1].attributes.name;
        if (rof) relatedOwner(ro);
      })
      .catch((error) => {
        this.setState({
          returnError: true,
        });
        console.log(error);
      });
  }

  render() {
    const { included } = this.state;
    if (included.attributes) {
      return (
        <div className="details__window">
          <p className="details__window__name">{included.attributes.name}</p>
          <div className="details__window__summary">
            <p className="darkergray blurb">{included.attributes.blurb}</p>
            <p>{included.attributes.summary}</p>
          </div>
        </div>
      );
    }
    const { returnError } = this.state;
    return (
      <div>
        <div className="render-container">
          {' '}
          {returnError ? (
            <div className="search-error">
              ERROR : {included.attributes.name}
              did not return any results{' '}
            </div>
          ) : (
            <div className="painting flx-ctr">
              <div>
                <svg className="loading" viewBox="25 25 50 50">
                  <circle cx="50" cy="50" r="20">
                    {' '}
                  </circle>{' '}
                </svg>{' '}
              </div>{' '}
            </div>
          )}{' '}
        </div>{' '}
      </div>
    );
  }
}

RelationDetails.propTypes = {
  did: PropTypes.number.isRequired,
  eid: PropTypes.number.isRequired,
  relatedOwner: PropTypes.func.isRequired,
};
