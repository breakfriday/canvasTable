import Konva from 'konva';
import { Rect } from 'konva/lib/shapes/Rect';
import { Stage } from 'konva/lib/Stage';
import { Group } from 'konva/lib/Group';
import { Layer } from 'konva/lib/Layer';

class RacingGame {
  private stage: Stage;
  private layer: Layer;
  private carImage: any;
  private racetrack: any;
  private tween: any;
  private trackPath = [];


  constructor(containerId) {
    this.stage = new Konva.Stage({
      container: containerId,
      width: window.innerWidth,
      height: window.innerHeight,
    });

    this.layer = new Konva.Layer();
    this.stage.add(this.layer);

    this.carImage = null;
    this.racetrack = null;
    this.tween = null;
    this.trackPath = [];
  }

  loadImage(imageUrl) {
    const imageObj = new Image();
    imageObj.src = imageUrl;
    imageObj.onload = () => {
      this.createRacingCar(imageObj);
      this.createRacetrack();
      this.layer.draw();
    };
  }

  createRacingCar(imageObj) {
    this.carImage = new Konva.Image({
      image: imageObj,
      x: this.stage.width() / 2,
      y: this.stage.height() / 2 - 100,
      width: 50,
      height: 50,
      offset: {
        x: 25,
        y: 25,
      },
    });
    this.layer.add(this.carImage);
  }

  createRacetrack() {
    for (let i = 0; i < 1000; i += 1) {
      this.trackPath.push(
        50 * Math.sin(i / 50) +
          50 * Math.sin(i / 100) +
          50 * Math.sin(i / 200) +
          window.innerWidth / 2,
      );
      this.trackPath.push(i);
    }


    const track = new Konva.Line({
      points: this.trackPath,
      stroke: 'black',
      strokeWidth: 5,
    });
    this.layer.add(track);
  }

  startRace() {
    let x = 0;
    this.animation = new Konva.Animation((frame) => {
      x += 1;
      const nextX = this.trackPath[x * 2];
      const nextY = this.trackPath[x * 2 + 1];
      this.carImage.setX(nextX);
      this.carImage.setY(nextY);

      // prevent the car from going off the track
      if (x * 2 >= this.trackPath.length) {
        this.animation.stop();
      }
    }, this.layer);
    this.animation.start();
  }
}


export default RacingGame;
