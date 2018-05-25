import React, { Component } from 'react';
import { times, find, get } from 'lodash';
import LoginChar from '../components/LoginChar';
import '../assets/login.css';
import Gamepad from 'react-gamepad';
import config from '../config';
import { getCustomToken } from '../utils';

Gamepad.layouts.XBOX.buttons.push('RS');


class Login extends Component {
  state = {
    select: times(4, (id) => ({
      id,
      value: '',
      active: false,
      valid: true,
      hover: 0,
    })),
    active: 0,
    invalid: false,
    loading: false,
  }

  selectItem = (block, val) => {
    const b = find(this.state.select, { id: block.id });
    b.value = val;
    b.valid = true;

    this.setState({ select: this.state.select });
  }

  setActive = (index) => {
    this.setState({ active: index });
  }
  
  auth = () => {
    let code = this.state.select.map((v) => {
      if (!v.value.length) v.valid = false;

      return v;
    });

    this.setState({ select: code });

    if (code.every((v) => v.value.length > 1) && !this.state.loading) {
      code = code.map(v => 'U+' + v.value.toUpperCase()).join('');
      const self = this;
      this.setState({ loading: true });
  
      return getCustomToken(code)
        .then(async (r) => {
          const { store, signIn } = this.props;
          this.setState({ loading: false });
  
          store.dispatch({ type: 'SAVE_CUSTOM_TOKEN', token: r.token });

          const user = await signIn(r.token);
          const token = await user.user.getIdToken();

          store.dispatch({ type: 'SAVE_TOKEN', data: token });
          store.dispatch({ type: 'START_GAME_AT_SCREEN' });
          store.dispatch({ type: 'G_NEW_GAME' });
          store.dispatch({ type: 'G_INIT_GAME' });
        })
      .catch((error) => {
        self.setState({ invalid: true, loading: false });
      });
    }
  }

  xpad = {
    DPadDown: () => {
      const len = config.alphabet.length - 1;
      const active = this.state.select[this.state.active];
      active.hover = active.hover < len ? ++active.hover : 0;
    },
    DPadUp: () => {
      const len = config.alphabet.length - 1;
      const active = this.state.select[this.state.active];
      active.hover = active.hover !== 0 ? --active.hover : len;
    },
    DPadRight: () => {
      const len = this.state.select.length - 1;
      const active = this.state.active;
      this.setActive(active < len ? active + 1 : 0);
    },
    DPadLeft: () => {
      const len = this.state.select.length - 1;
      const active = this.state.active;

      this.setActive(active !== 0 ? active - 1 : len);
    },
    A: () => {
      const active = this.state.active;
      const block = this.state.select[active];

      this.selectItem(block, config.alphabet[block.hover]);
      this.xpad.DPadRight();
    },
    B: () => this.auth(),
    RT: () => this.xpad.A(),
    X: () => this.xpad.A(),
    Back: () => {
      this.state.select.map((v) => {
        v.value = '';
        v.hover = 0;

        return v;
      });
    },
    DEFAULT: () => {
      this.setActive(0);
    },
    ArrowDown: () => this.xpad.DPadDown(),
    ArrowUp: () => this.xpad.DPadUp(),
    ArrowLeft: () => this.xpad.DPadLeft(),
    ArrowRight: () => this.xpad.DPadRight(),
    Enter: () => this.xpad.A(),
  }

  onConnect = (gamepadIndex) => {
    this.setActive(0);
  };

  arrowButton = (e) => {
    this.xpadButtonChange(e.key, true);
  }
  
  xpadButtonChange = (e, bool) => {
    const buttonHandler = get(this.xpad, e, this.xpad.DEFAULT);

    if (bool) {
      try {
        buttonHandler(e);
        this.setState({ select: this.state.select });
      } catch (error) {
        this.xpad.DEFAULT();
      }
    }
  };

  render() {
    document.onkeydown = this.arrowButton;

    return (
      <Gamepad
        onConnect={this.onConnect}
        onButtonChange={this.xpadButtonChange}
        >
        <div>
          <div className="xbox-info" onClick={this.auth}>
            <div className="xbox-icon"><img alt="footer" src="https://png.icons8.com/color/64/000000/xbox-a.png"/></div>
            <div className="xbox-description">Начать игру</div>
          </div>
          <div className={"login " + (this.state.invalid ? "invalid" : "")}>
            <div className="login-title">Введите Ваш код:</div>
            { this.state.select.map((v,k) => <LoginChar
                selectItem={this.selectItem}
                setActive={this.setActive}
                active={this.state.active}
                key={k} index={k}
                code={v}
              /> )
            }
            <div className="login-footer">Нет кода? получи его на cloudpipe.win</div>
          </div>
        </div>
      </Gamepad>
    )
  }
};

export default Login;
