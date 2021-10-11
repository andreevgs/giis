export default class CurvService {
    createCircle(Xc, Yc, R) {
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

    createEllipse(a, b) {
        let x = 0, y = 0, delta = 0;
        const result = [];
        while (Math.pow(b,2) * x < Math.pow(a, 2) * y) {
            result.push({ x: x, y: y});
            delta = Math.pow(b,2) * Math.pow((x + 1), 2) + Math.pow(a, 2) * Math.pow((y - 0.5), 2) - Math.pow(a, 2) * Math.pow(b, 2);
            x = x + 1;
            if (delta >= 0) {
                y = y - 1;
            }
        }

        while (y >= 0) {
            result.push({ x: x, y: y});
            delta = Math.pow(b,2) * Math.pow((x + 0.5), 2) + Math.pow(a, 2) * Math.pow((y - 1), 2) - Math.pow(a, 2) * Math.pow(b, 2);
            x = x + 1;
            if (delta < 0) {
                x = x + 1;
            }
            y = y - 1;
        }

        const half = this.mirrorX(result);
        return this.mirrorY(half);
    }

    mirrorX(arr) {
        const result = [];
        arr.forEach((item) => {
           result.push(item);
           result.push({ x: -1 * item.x, y: item.y });
        });
        return result;
    }

    mirrorY(arr) {
        const result = [];
        arr.forEach((item) => {
            result.push(item);
            result.push({ x: item.x, y: -1 * item.y });
        });
        return result;
    }

    createFirstHyp(a, b, start, end) {
        const result = [];
        for (let i = start; i <= end; i++) {
            result.push({
               x: i,
               y: Math.sqrt(Math.pow(b,2) * (Math.pow(i, 2)/ Math.pow(a, 2) - 1)),
            });
        }
    }

    createSecondHyp(a, b, start, end) {
        const result = [];
        for (let i = start; i <= end; i++) {
            result.push({
                x: i,
                y: Math.sqrt(Math.pow(b,2) * (Math.pow(i, 2)/ Math.pow(a, 2) + 1)),
            });
        }
    }

    createThirdHyp(p, start, end) {
        const result = [];
        for (let i = start; i <= end; i++) {
            result.push({
                x: i,
                y: Math.sqrt(2 * p * i),
            });
        }
    }
}

