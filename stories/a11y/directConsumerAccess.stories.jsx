import PropTypes from "prop-types";
import React, { Component } from "react";
import { Button } from "@digital-science/figshare-fcl/button";
import { withA11y } from "@digital-science/figshare-fcl/a11y/context";
import {
  LinkingProvider,
  LinkingObject,
  LinkingReference,
  withLinkingContext,
} from "@digital-science/figshare-fcl/a11y/linking/index";

// eslint-disable-next-line css-modules/no-unused-class
import styles from "./storybook.stories.css";


const DebugComponent = withLinkingContext(({ linkingContext }) => (
  <pre className={styles.debug}>
    {JSON.stringify(linkingContext, null, 2)}
  </pre>
));


class DirectConsumerAccess extends Component {
  static propTypes = { a11yContext: PropTypes.object.isRequired }

  state = { sections: [{ identifier: "identifier1" }, { identifier: "identifier2" }] }

  render() {
    const { sections } = this.state;

    return (
      <div className={styles.section}>
        <h1>Accessing the data of the context</h1>
        <div className={styles.row}>
          <LinkingProvider>
            <div className={styles.row}>
              <h5>This is the content of the data stored: </h5>
              <DebugComponent />
            </div>
            <h4>Multiple linkings in the same provider using identifier keys</h4>
            {sections.map(this.renderSection)}
            <div>
              <Button variant="link" onClick={this.onAddSection}>+ Add new section</Button>
            </div>
          </LinkingProvider>
        </div>
      </div>
    );
  }

  renderSection = ({ identifier, id }, index) => (
    <React.Fragment key={index}>
      <div className={styles.buttonRow}>
        <LinkingObject
          attributes={["aria-labelledby", "aria-describedby"]}
          component={Button}
          identifierKey={identifier}
        >
          Learn more
        </LinkingObject>
        <Button variant="link" onClick={this.onIdUpdate(index)}>Update the id</Button>
        <Button variant="link" onClick={this.onIdentifierUpdate(index)}>Update identifier</Button>
        <Button variant="link" onClick={this.onDelete(index)}>Delete</Button>
      </div>
      <LinkingReference
        className={styles.label}
        component="span"
        forAttributes="aria-labelledby"
        id={id}
        identifierKey={identifier}
      >
        Label for the button
      </LinkingReference>
      <LinkingReference
        className={styles.label}
        component="span"
        forAttributes="aria-describedby"
        identifierKey={identifier}
        style={ { display: "none" } }
      >
        Hidden description
      </LinkingReference>
      <LinkingReference
        className={styles.label}
        component="span"
        forAttributes="aria-describedby"
        identifierKey={identifier}
        style={ { display: "none" } }
      >
        Hidden description part 2
      </LinkingReference>
    </React.Fragment>
  )

  onAddSection = () => {
    const { a11yContext } = this.props;
    this.setState({ sections: [...this.state.sections, { identifier: a11yContext.uid.generate() }] });
  }

  onIdUpdate = (index) => () => {
    const { a11yContext } = this.props;
    const { sections } = this.state;

    const nextSections = sections.map((s, i) => {
      if (i !== index) {
        return s;
      }

      return { ...sections[index], id: a11yContext.uid.generate() };
    });

    this.setState({ sections: nextSections });
  }

  onIdentifierUpdate = (index) => () => {
    const { a11yContext } = this.props;
    const { sections } = this.state;

    const nextSections = sections.map((s, i) => {
      if (i !== index) {
        return s;
      }

      return { ...sections[index], identifier: a11yContext.uid.generate() };
    });

    this.setState({ sections: nextSections });
  }

  onDelete = (index) => () => {
    const { sections } = this.state;

    const nextSections = sections.filter((_, i) => i !== index);

    this.setState({ sections: nextSections });
  }
}

export const ConsumerShowcase = withA11y(DirectConsumerAccess);
