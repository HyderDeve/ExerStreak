import Svg, { Defs, Ellipse, LinearGradient, Path, Stop } from "react-native-svg";

const FlameIllustration = ({ size = 220 }: { size?: number }) => (
  <Svg width={size} height={(size * 220) / 200} viewBox="0 0 200 220">
    <Defs>
      <LinearGradient id="outer" x1="0.5" y1="0" x2="0.5" y2="1">
        <Stop offset="0" stopColor="#FF9F45" />
        <Stop offset="0.55" stopColor="#F97316" />
        <Stop offset="1" stopColor="#E8590C" />
      </LinearGradient>
      <LinearGradient id="inner" x1="0.5" y1="0" x2="0.5" y2="1">
        <Stop offset="0" stopColor="#FFF1DA" />
        <Stop offset="1" stopColor="#FDBA74" />
      </LinearGradient>
    </Defs>

    {/* soft ground shadow */}
    <Ellipse cx="100" cy="209" rx="74" ry="7" fill="#F97316" opacity={0.14} />

    {/* outer flame: centre tongue + left and right lobes */}
    <Path
      d="M100 6 C108 40 142 60 142 98 C150 84 156 72 158 58 C184 84 196 114 196 146 C196 184 154 212 100 212 C46 212 4 184 4 146 C4 118 14 92 28 62 C32 82 44 94 58 100 C56 62 80 32 100 6 Z"
      fill="url(#outer)"
    />

    {/* inner flame */}
    <Path
      d="M100 98 C104 124 136 138 136 168 C136 192 120 204 100 204 C80 204 64 192 64 168 C64 138 96 124 100 98 Z"
      fill="url(#inner)"
    />
  </Svg>
);

export default FlameIllustration;
