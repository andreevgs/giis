import * as math from 'mathjs';

export default class CurvService {
    createCircle(Xc, Yc, R) {
        Xc = parseInt(Xc);
        Yc = parseInt(Yc);
        R = parseInt(R);

        let x = 0, y = R, delta = 1 - 2 * R, error = 0;
        const result = [];
        while (y >= 0) {
            result.push({ x: Xc + x, y: Yc + y });
            result.push({ x: Xc + x, y: Yc - y });
            result.push({ x: Xc - x, y: Yc + y });
            result.push({ x: Xc - x, y: Yc - y });

            error = 2 * (delta + y) - 1;
            if ((delta < 0) && (error <= 0)) {
                delta += 2  * (++x) + 1;
                continue;
            }
            error = 2 * (delta - x) - 1;
            if ((delta > 0) && (error > 0)) {
                delta += 1  - 2 * (--y);
                continue;
            }
            x++;
            delta += 2 * (x - y);
            y--;
        }
        return result;
    }

    createEllipse(a, b, Xc, Yc) {
        const result = []
        Xc = parseInt(Xc);
        Yc = parseInt(Yc);
        let d1,d2;
        let i, x, y;
        let rx = parseInt(a), ry = parseInt(b), rxsq, rysq, tworxsq, tworysq, dx, dy;

        rxsq=rx*rx;
        rysq=ry*ry;
        tworxsq=2*rxsq;
        tworysq=2*rysq;
        x=0;
        y=ry;
        d1=rysq - (rxsq * ry) + (0.25 * rxsq);
        dx= tworysq * x;
        dy= tworxsq * y;
        result.push({ x: Xc + rx, y: Yc });
        result.push({ x: Xc - rx, y: Yc });
        do
        {
            result.push({ x: Xc + x, y: Yc + y });
            result.push({ x: Xc + x, y: Yc - y });
            result.push({ x: Xc - x, y: Yc + y });
            result.push({ x: Xc - x, y: Yc - y })
            if (d1 < 0)
            {
                x=x+1;
                // y=y;
                dx=dx + tworysq;
                d1=d1 + dx + rysq;
            }
            else
            {
                x=x+1;
                y=y-1;
                dx= dx + tworysq;
                dy= dy - tworxsq;
                d1= d1 + dx - dy + rysq;
            }
        } while (dx < dy);
        d2 = rysq * ( x + 0.5) * ( x + 0.5 ) + rxsq * (y - 1) * (y-1) - rxsq * rysq;
        do
        {
            result.push({ x: Xc + x, y: Yc + y });
            result.push({ x: Xc + x, y: Yc - y });
            result.push({ x: Xc - x, y: Yc + y });
            result.push({ x: Xc - x, y: Yc - y })

            if (d2 > 0)
            {
                // x=x;
                y=y-1;
                dy = dy - tworxsq;
                d2 = d2 - dy + rxsq;
            }
            else
            {
                x= x+1;
                y=y-1;
                dy=dy - tworxsq;
                dx= dx + tworysq;
                d2 = d2 + dx -dy + rxsq;
            }
        } while (y > 0);
        return result;
    }

    createFirstHyp(a, b) {
        a = parseInt(a);
        b = parseInt(b);
        var result = [];

        var x = 0;
        var y = b;

        var aPow2 = a*a;
        var bPow2 = b*b;

        result.push({ x: x, y: y });

        var delta = aPow2 * (2 * b + 1) - bPow2;

        while (y < 30 && x < 30) {
            var sigma = 2 * delta - aPow2 * (2 * y + 1);
            if (delta > 0 && sigma > 0) {
                x += 1;
                delta -= bPow2 * (2 * x + 1);
                result.push({ x: x, y: y });
                continue;
            }
            var sigma_ = 2 * delta + bPow2 * (2 * x + 1);
            if (delta < 0 && sigma_ <= 0) {
                y += 1;
                delta += aPow2 * (2 * y + 1);
                result.push({ x: x, y: y });
                continue;
            }
            x += 1;
            y += 1;
            delta += aPow2 * (2 * y + 1) - bPow2 * (2 * x + 1);
            result.push({ x: x, y: y });
        }
        return result;
    }

    createSecondHyp(a) {
        a = parseInt(a);
        var x = 0;
        var y = 30;

        var delta = 1 - 2 * a;

        var points = [];
        points.push({ x: x, y: y});

        while (y > 0) {
            var sigma = 2 * delta - 2 * x - 1;
            if (delta > 0 && sigma > 0) {
                y -= 1;
                delta -= 2 * a;
                points.push({ x: x, y: y});
                continue;
            }
            var sigma_ = 2 * delta + 2 * a
            if (delta < 0 && sigma_ <= 0) {
                x += 1;
                delta += 2 * x + 1;
                points.push({ x: x, y: y});
                continue;
            }
            x += 1;
            y -= 1;
            delta += 2 * x + 1 - 2 * a;
            points.push({ x: x, y: y});
        }
        return points;
    }

    createThirdHyp(p, start, end) {
        p = parseInt(p);
        start = parseInt(start);
        end = parseInt(end);

        const result = [];
        for (let i = start; i <= end; i++) {
            result.push({
                x: i,
                y: Math.sqrt(2 * p * i),
            });
        }
    }

    drawCurveErmit(points) {
        var pointResult = [];

        var p1 = points[0];
        var p4 = points[1];
        var r1 = points[2];
        var r4 = points[3];

        var i = 0;
        var t = 0.0;
        var step = 0.01;

        var a = math.matrix([[2, -2, 1, 1], [-3, 3, -2, -1], [0, 0, 1, 0], [1, 0, 0, 0]]);

        var b = math.matrix([[p1.x, p1.y], [p4.x, p4.y], [r1.x, r1.y], [r4.x, r4.y]]);

        var c = math.multiply(a, b);

        while (t <= 1) {
            var tMatrix = math.matrix([[t * t * t, t * t, t, 1]]);
            var r = math.multiply(tMatrix, c);
            console.log('r: ', r);
            var x = math.subset(r, math.index(0, 0));
            var y = math.subset(r, math.index(0, 1));
            pointResult.push({ x: Math.round(x), y: Math.round(y) });
            t += step;
            i++;
        }

        return pointResult;
    }

    drawCurveBezie(points) {
        var pointResult = [];

        var p1 = points[0];
        var p2 = points[1];
        var p3 = points[2];
        var p4 = points[3];

        var i = 0;
        var t = 0.0;
        var step = 0.005;

        var a = math.matrix([[-1, 3, -3, 1], [3, -6, 3, 0], [-3, 3, 0, 0], [1, 0, 0, 0]]);

        var b = math.matrix([[p1.x, p1.y], [p2.x, p2.y], [p3.x, p3.y], [p4.x, p4.y]]);

        var c = math.multiply(a, b);

        while (t <= 1) {
            var tMatrix = math.matrix([[t * t * t, t * t, t, 1]]);
            var r = math.multiply(tMatrix, c);
            var x = math.subset(r, math.index(0, 0));
            var y = math.subset(r, math.index(0, 1));
            pointResult.push({ x: Math.round(x), y: Math.round(y) });
            t += step;
            i++;
        }

        return pointResult;
    }

    drawCurveBSpline(points) {
        var pointResult = [];

        var n = points.length;

        var k = 0;
        var step = 0.01;

        var a = math.matrix([[-1, 3, -3, 1], [3, -6, 3, 0], [-3, 0, 3, 0], [1, 4, 1, 0]]);

        var i = 1;
        while (i <= n-3) {
            var b = math.matrix([[points[i-1].x, points[i-1].y], [points[i].x, points[i].y],
                [points[i+1].x, points[i+1].y], [points[i+2].x, points[i+2].y]]);
            console.log('points: ', b);
            var c = math.multiply(a, b);
            var t = 0.0;
            while (t <= 1) {
                var tMatrix = math.matrix([[t * t * t, t * t, t, 1]]);
                var r = math.multiply(tMatrix, c);
                var x = math.subset(r, math.index(0, 0)) / 6;
                var y = math.subset(r, math.index(0, 1)) / 6;
                pointResult.push({ x: Math.round(x), y: Math.round(y) });
                t += step;
                k++;
            }
            i++;
        }

        return pointResult;
    }
}

