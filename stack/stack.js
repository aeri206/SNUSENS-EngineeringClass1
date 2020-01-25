/* eslint-disable no-console */
import anime from '/animejs/lib/anime.es.js';

// console.log('hello');

const colors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'];
const colorCount = 13;

let QCNT = 0;

const addSCMD = (cmd) => {
  const terminal = document.querySelector('div.S.terminal');
  const newCmd = document.createElement('p');
  newCmd.classList.add('command');
  newCmd.innerText = cmd;
  terminal.appendChild(newCmd);
};

const addQCMD = (cmd) => {
  const terminal = document.querySelector('div.Q.terminal');
  const newCmd = document.createElement('p');
  newCmd.classList.add('command');
  newCmd.innerText = cmd;
  terminal.appendChild(newCmd);
}
const addSLOG = (log) => {
  const terminal = document.querySelector('div.S.terminal');
  const newCmd = document.createElement('p');
  newCmd.classList.add('log');
  newCmd.innerText = `> ${log}`;
  terminal.appendChild(newCmd);
};

const addSWARN = (warning) => {
  const container = document.querySelector('div.S.warning');
  container.classList.add('exist');
  container.innerText = ` > ${warning}`;
};

const removeSWARN = () => {
  document.querySelector('div.S.warning').classList.remove('exist');
};

const pushVal = (val) => {
  const container = document.querySelector('div#stack div.ui.segments');
  const p = document.createElement('p');
  p.innerText = val;
  const newDiv = document.createElement('div');
  newDiv.classList.add('ui', 'large-number', 'segment', 'used');
  newDiv.appendChild(p);
  const emptyDiv = document.querySelectorAll('div#stack div.segment.null');
  if (emptyDiv.length > 0) {
    emptyDiv[emptyDiv.length - 1].remove();
  }
  const valueDiv = document.querySelectorAll('div#stack div.segment.used');
  const divColor = colors[valueDiv.length % colorCount];
  newDiv.classList.add(divColor);
  if (valueDiv.length > 0) {
    container.insertBefore(newDiv, container.firstElementChild);
  } else {
    container.insertBefore(newDiv, container.firstElementChild);
  }
  addSCMD(`PUSH ${val}`);
};


const stackCreateButton = () => {
  document.querySelector('div#stack-container button#createSButton').addEventListener('click', () => {
    removeSWARN();
    const ifInitial = document.querySelector('div.initial#stack');
    if (ifInitial) {
      ifInitial.classList.remove('initial');
    } else {
      addSWARN('이미 스택이 생성되어 있습니다');
    }
  });
};

const stackPushButton = () => {
  document.querySelector('div#stack-container button#pushButton').addEventListener('click', (e) => {
    const val = e.target.parentElement.firstElementChild.value;
    e.target.parentElement.firstElementChild.value = null;
    removeSWARN();
    if (document.querySelector('div.initial#stack')) {
      addSWARN('스택을 먼저 생성하세요');
    } else if (!isNaN(val) && !isNaN(parseInt(val))) {
      const realVal = parseInt(val);
      pushVal(realVal);
    } else {
      addSWARN('숫자를 입력해주세요');
    }
  });
};

const stackPopButton = () => {
  document.querySelector('div#stack-container button#popButton').addEventListener('click', () => {
    removeSWARN();
    if (document.querySelector('div.initial#stack')) {
      addSWARN('스택을 먼저 생성하세요');
    } else {
      const valueDiv = document.querySelectorAll('div#stack div.segment.used');
      if (valueDiv.length === 0) {
        addSWARN('스택이 비어있습니다');
      } else {
        const container = document.querySelector('div#stack div.ui.segments');
        const popValue = valueDiv[0].innerText;
        addSCMD('POP');
        setTimeout(() => {
          addSLOG(popValue);
        }, 1000);
        valueDiv[0].remove();
        if (container.childElementCount < 6) {
          const p = document.createElement('p');
          p.innerText = 'NL';
          const newDiv = document.createElement('div');
          newDiv.classList.add('ui', 'large-number', 'segment', 'null');
          newDiv.appendChild(p);
          container.appendChild(newDiv);
        }
      }
    }
  });
};

const stackClearLog = () => {
  document.querySelector('div#stack-container button#clearSButton').addEventListener('click', () => {
    const terminal = document.querySelector('div.S.terminal');
    while (terminal.childElementCount > 1) {
      terminal.removeChild(terminal.lastElementChild);
    }
  });
};

const removeQWARN = () => {
  document.querySelector('div.Q.warning').classList.remove('exist');
};

const addQWARN = (warning) => {
  const container = document.querySelector('div.Q.warning');
  container.classList.add('exist');
  container.innerText = ` > ${warning}`;
};

const enQueue = (val) => {
//  QCNT ++;
  addQCMD(`ENQUEUE ${val}`);
  const container = document.querySelector('#queueBlock');
  const p = document.createElement('p');
  p.innerText = val;
  const newDiv = document.createElement('div');
  newDiv.classList.add('ui', 'large-number', 'segment', 'used');
  newDiv.appendChild(p);
  const divColor = colors[QCNT % colorCount];
  newDiv.classList.add(divColor);
  QCNT++;
  const emptyDiv = container.querySelectorAll('div.segment.null');
  const line = container.querySelectorAll('div.segments');
  if (emptyDiv.length === 0) {
    const newDivLine = document.createElement('div');
    const lastLine = line[line.length - 1];
    line[0].insertBefore(newDiv, line[0].firstElementChild);
    newDivLine.classList.add('ui', 'horizontal', 'segments');
    newDivLine.innerHTML = `
                                <div class="ui segment large-number null">
                                  <p>NL</p>
                                </div>
                                <div class="ui segment large-number null">
                                  <p>NL</p>
                                </div>
                                <div class="ui segment large-number null">
                                    <p>NL</p>
                                  </div>
                                  <div class="ui segment large-number null">
                                      <p>NL</p>
                                    </div>
    `;
    newDivLine.insertBefore(lastLine.lastElementChild, newDivLine.firstElementChild);
    container.appendChild(newDivLine);
    // 새로 한줄 추가해야함
  } else if (line.length === 1) { // 오른쪽으로 한칸씩 + 한줄밖에 없을 경우
    line[0].removeChild(line[0].lastElementChild);
    line[0].insertBefore(newDiv, line[0].firstElementChild);
  } else if (line.length > 1) { // 오른쪽으로 한칸씩 + 한줄 더 안만들어도 됨.
    for (let i = 0; i < line.length - 1; i++) {
      console.log('insert');
      line[i + 1].insertBefore(line[i].lastElementChild, line[i + 1].firstElementChild);
    }
    line[0].insertBefore(newDiv, line[0].firstElementChild);
    const lastLine = line[line.length - 1];
    lastLine.removeChild(lastLine.lastElementChild);
  }
};

const queueCreateButton = () => {
  document.querySelector('div#queue-container button#createQButton').addEventListener('click', () => {
    removeQWARN();
    const ifInitial = document.querySelector('div.initial#queue');
    if (ifInitial) {
      ifInitial.classList.remove('initial');
    } else {
      addQWARN('이미 큐가 생성되어 있습니다');
    }
  });
};

const queueEnButton = () => {
  document.querySelector('#enQButton').addEventListener('click', (e) => {
    const val = e.target.parentElement.firstElementChild.value;
    e.target.parentElement.firstElementChild.value = null;
    removeQWARN();
    if (document.querySelector('div.initial#queue')) {
      addQWARN('큐를 먼저 생성하세요');
    } else if (!isNaN(val) && !isNaN(parseInt(val))) {
      const realVal = parseInt(val);
      enQueue(realVal);
    } else {
      addQWARN('숫자를 입력해주세요');
    }
  });
};

const queueDeButton = () => {
  document.querySelector('#deQButton').addEventListener('click', () => {
    removeQWARN();
    if (document.querySelector('div.initial#queue')) {
      addQWARN('큐를 먼저 생성하세요');
    } else {
      console.log('dequeue');
    }
  });
};


const stackButtons = () => {
  stackCreateButton();
  stackPushButton();
  stackPopButton();
  stackClearLog();
};

const queueButtons = () => {
  queueCreateButton();
  queueEnButton();
  queueDeButton();
};


const load = () => {
  stackButtons();
  queueButtons();
};

window.onload = load;
