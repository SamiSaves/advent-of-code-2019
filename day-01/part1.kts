import kotlin.*
import java.io.File

fun divide(number: Double): Double = number / 3
fun round(number: Double): Double = Math.floor(number)
fun subtract(number: Double): Double = number - 2

val masses = File("input").readLines().map { it.toDouble() }
val fuelRequirements = masses.map { subtract(round(divide(it))) }
val result = fuelRequirements.sum()
println("Total fuel requirements for all spacecraft modules: ${result.toInt()}")
