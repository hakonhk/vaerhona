import React, { Component } from 'react';
// import keycode from "keycode";

import { Button, IconArrow } from 'ui';

import { Outer, Inner, Images, Bottom } from './ui';
import Image from './image';
import SplitImage from './split-image';

function getClosestSnapshot({ dateToBeCloseTo, snapshots }) {
  if (!snapshots.length) {
    return;
  }

  let closest = snapshots[0];
  for (let i = 1; i < snapshots.length; i++) {
    const s = snapshots[i];

    if (
      Math.abs(new Date(s.date) - dateToBeCloseTo) <
      Math.abs(new Date(closest.date) - dateToBeCloseTo)
    ) {
      closest = s;
    }
  }

  return closest;
}

export default class SnapshotImage extends Component {
  constructor(props) {
    super(props);

    const { snapshots = [], compareSnapshots = [] } = props;
    this.state = {
      selectedSnapshot: snapshots[snapshots.length - 1],
      compareSnapshot: compareSnapshots[compareSnapshots.length - 1],
      loadingDir: 0
    };
  }

  componentWillMount() {
    const { selectedSnapshot, compareSnapshot } = this.state;
    const s = this.getCompareSnapshot(selectedSnapshot);

    if (compareSnapshot && s.cuid !== compareSnapshot.cuid) {
      this.ss({
        compareSnapshot: s
      });
    }
  }

  getCurrentIndex = () =>
    this.props.snapshots.findIndex(
      s => s.cuid === this.state.selectedSnapshot.cuid
    );

  getCompareSnapshot = selectedSnapshot => {
    const { compareSnapshots } = this.props;

    const dateToBeCloseTo = new Date(selectedSnapshot.date);
    dateToBeCloseTo.setFullYear(dateToBeCloseTo.getFullYear() - 1);

    return getClosestSnapshot({ dateToBeCloseTo, snapshots: compareSnapshots });
  };

  go = (dir, comingFromDataLoad) => {
    const { snapshots } = this.props;

    const currentIndex = this.getCurrentIndex();

    let newIndex = currentIndex + dir;
    if (dir >= 0 && dir <= snapshots.length - 1 && Math.abs(dir) === 24) {
      const currentDate = new Date(snapshots[currentIndex].date);
      currentDate.setHours(currentDate.getHours() + dir);
      const snapshot = getClosestSnapshot({
        dateToBeCloseTo: currentDate,
        snapshots
      });
      newIndex = snapshots.findIndex(s => s === snapshot);
    }

    if (comingFromDataLoad) {
      if (dir > 0 && newIndex > snapshots.length - 1) {
        newIndex = snapshots.length - 1;
      } else if (dir < 0 && newIndex < 0) {
        newIndex = 0;
      }
    }

    const newSnapshot = snapshots[newIndex];
    if (newSnapshot) {
      return this.setState({
        selectedSnapshot: newSnapshot,
        compareSnapshot: this.getCompareSnapshot(newSnapshot)
      });
    }

    if (!comingFromDataLoad) {
      this.loadMoreSnapshots(dir);
    }
  };

  goBackOneHour = () => this.go(-1);
  goForwardOneHour = () => this.go(1);
  goBackOneDay = () => this.go(-24);
  goForwardOneDay = () => this.go(24);

  loadMoreSnapshots = async dir => {
    if (this.state.loadingDir === 0) {
      await this.ss({
        loadingDir: dir
      });

      let from;
      let to;

      const { snapshots } = this.props;

      if (dir < 0) {
        // Load older
        const [first] = snapshots;
        to = new Date(first.date).getTime();
      } else {
        // Load newer
        const last = snapshots[snapshots.length - 1];
        from = new Date(last.date).getTime();
      }

      try {
        await this.props.loadMoreSnapshots({ from, to, limit: 24 });
      } catch (e) {
        console.log(e);
      }

      await this.ss({
        loadingDir: 0
      });

      this.go(dir, true);
    }
  };

  ss = s => new Promise(r => this.setState(s, r));

  render() {
    const { place, compare } = this.props;
    const { selectedSnapshot, compareSnapshot, loadingDir } = this.state;

    if (!selectedSnapshot) {
      return (
        <Outer>
          <Inner>No snapshots found for {place.name}</Inner>
        </Outer>
      );
    }

    return (
      <Outer>
        <Inner>
          <Images compare={compare}>
            {!compare ? (
              <Image snapshot={selectedSnapshot} place={place} />
            ) : (
              <>
                <Image compare snapshot={compareSnapshot} place={place} />
                <Image compare snapshot={selectedSnapshot} place={place} />
              </>
            )}
          </Images>
          {compare && (
            <SplitImage
              snapshot={selectedSnapshot}
              compareSnapshot={compareSnapshot}
            />
          )}
          <Bottom>
            <span>
              <Button
                clean
                onClick={this.goBackOneDay}
                loading={loadingDir === -24}
              >
                <IconArrow left />
                <IconArrow left />
              </Button>
              <Button
                clean
                onClick={this.goBackOneHour}
                loading={loadingDir === -1}
              >
                <IconArrow left />
              </Button>
            </span>
            <span>
              <Button
                clean
                onClick={this.goForwardOneHour}
                loading={loadingDir === 1}
              >
                <IconArrow />
              </Button>
              <Button
                clean
                onClick={this.goForwardOneDay}
                loading={loadingDir === 24}
              >
                <IconArrow />
                <IconArrow />
              </Button>
            </span>
          </Bottom>
        </Inner>
      </Outer>
    );
  }
}
