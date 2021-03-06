import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ContactItem from "./ContactItem";
import { CSSTransition } from "react-transition-group";
import { transitions } from "../lib/style-utils";
import ImmutablePropTypes from "react-immutable-proptypes";

const Wrapper = styled.div`
  margin-top: 1rem;

  .contact-enter {
    animation: ${transitions.stretchOut} 0.15s linear;
    animation-fill-mode: forwards;
  }

  .contact-leave {
    animation: ${transitions.shrinkIn} 0.15s linear;
    animation-fill-mode: forwards;
  }
`;

class ContactList extends Component {
  static propTypes = {
    contacts: ImmutablePropTypes.listOf(
      ImmutablePropTypes.mapContains({
        id: PropTypes.string,
        name: PropTypes.string,
        phone: PropTypes.string,
        color: PropTypes.string,
        favorite: PropTypes.bool,
      })
    ),
    search: PropTypes.string, // 검색 키워드
    onToggleFavorite: PropTypes.func, // 즐겨찾기 토글
    onOpenModify: PropTypes.func, // 수정 모달 띄우기
  };

  render() {
    const { contacts, onOpenModify, search, onToggleFavorite } = this.props;

    const contactList = contacts
      .filter(
        // 키워드로 필터링
        (c) => c.get("name").indexOf(search) !== -1
      )
      .sort(
        // 가나다순으로 정렬
        (a, b) => {
          if (a.get("name") > b.get("name")) return 1;
          if (a.get("name") < b.get("name")) return -1;
          return 0;
        }
      )
      .map(
        // 컴포넌트로 매핑
        (contact) => (
          <ContactItem
            key={contact.get("id")}
            contact={contact}
            onOpenModify={onOpenModify}
            onToggleFavorite={onToggleFavorite}
          />
        )
      );

    return (
      <Wrapper>
        <CSSTransition
          transitionName="contact"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {contactList}
        </CSSTransition>
      </Wrapper>
    );
  }
}

export default ContactList;

