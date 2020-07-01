import Colors from "../constants/Colors";

interface DefaultOptions {
  headerStyle: {
    backgroundColor: string
  },
  headerTintColor: string,
  headerTitleStyle: {
    fontFamily: string,
    fontSize: number
  }
}

const StackDefaultOptions: DefaultOptions = {
  headerStyle: {
    backgroundColor: Colors.primary
  },
  headerTintColor: "white",
  headerTitleStyle: {
    fontFamily: "lobster",
    fontSize: 25
  }
}

export default StackDefaultOptions;