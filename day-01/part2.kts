import kotlin.*
import java.io.File

fun divide(number: Double): Double = number / 3
fun round(number: Double): Double = Math.floor(number)
fun subtract(number: Double): Double = number - 2
fun calculateFuel(mass: Double): Double =  subtract(round(divide(mass)))
fun getTotalFuelForMass(mass: Double): Double {
  val fuelNeeded = calculateFuel(mass)

  return if (fuelNeeded <= 0) {
    .0
  } else {
    fuelNeeded + getTotalFuelForMass(fuelNeeded)
  }
}

val masses = File("input").readLines().map { it.toDouble() }
val fuelRequirements = masses.map(::getTotalFuelForMass)
val result = fuelRequirements.sum()

println("Total fuel requirements for all spacecraft modules: ${result.toInt()}")
